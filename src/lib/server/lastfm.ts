import { albumsFromTracks, type MusicFeed, type MusicTrack } from "../music";
import { demoFeed } from "./music-demo";

export interface MusicConfig {
  username: string;
  apiKey: string;
  demo: boolean;
}

export class MusicRequestError extends Error {
  constructor(message: string, public status: number) {
    super(message);
  }
}

interface RecentPage {
  tracks: MusicTrack[];
  totalPages: number;
}

// Short-lived, bounded per-worker cache. It also coalesces concurrent requests.
const responses = new Map<string, { expiresAt: number; pending: Promise<RecentPage> }>();

function record(value: unknown): Record<string, unknown> {
  return typeof value === "object" && value !== null ? value as Record<string, unknown> : {};
}

function text(value: unknown): string {
  if (typeof value === "string") return value;
  const object = record(value);
  return typeof object["#text"] === "string" ? object["#text"] as string
    : typeof object.name === "string" ? object.name : "";
}

function safeUrl(value: unknown): string {
  if (typeof value !== "string") return "";
  try {
    const url = new URL(value);
    return url.protocol === "https:" ? url.href : "";
  } catch {
    return "";
  }
}

export function parseRecentPage(payload: unknown): RecentPage {
  const body = record(payload);
  if (body.error) throw new MusicRequestError("Listening history is temporarily unavailable.", 502);
  const recent = record(body.recenttracks);
  if (!recent.track) {
    if (body.recenttracks) return { tracks: [], totalPages: 0 };
    throw new MusicRequestError("Listening history is temporarily unavailable.", 502);
  }
  const entries = Array.isArray(recent.track) ? recent.track : [recent.track];
  const tracks: MusicTrack[] = [];
  for (const entry of entries) {
    const item = record(entry);
    const name = text(item.name);
    const artist = text(item.artist);
    if (!name || !artist) continue;
    const images = Array.isArray(item.image) ? item.image : [];
    let image = "";
    for (const candidate of images) {
      const url = safeUrl(text(candidate));
      if (url && !url.includes("2a96cbd8b46e442fc41c2b86b821562f")) image = url;
    }
    const isPlaying = record(item["@attr"]).nowplaying === "true";
    const timestamp = Number(record(item.date).uts);
    tracks.push({
      name,
      artist,
      album: text(item.album),
      image,
      url: safeUrl(item.url) || `https://www.last.fm/music/${encodeURIComponent(artist)}/_/${encodeURIComponent(name)}`,
      playedAt: !isPlaying && Number.isFinite(timestamp) && timestamp > 0 ? timestamp * 1000 : null,
      isPlaying,
    });
  }
  const total = Number(record(recent["@attr"]).totalPages);
  return { tracks, totalPages: Number.isFinite(total) ? Math.max(0, total) : 1 };
}

async function recentPage(fetcher: typeof fetch, config: MusicConfig, page: number, anchor?: number): Promise<RecentPage> {
  const cacheKey = `${config.username}:${config.apiKey}:${page}:${anchor ?? "current"}`;
  const cached = responses.get(cacheKey);
  if (cached && cached.expiresAt > Date.now()) return cached.pending;
  if (responses.size >= 128) {
    for (const [key, value] of responses) {
      if (value.expiresAt <= Date.now()) responses.delete(key);
    }
    if (responses.size >= 128) responses.delete(responses.keys().next().value!);
  }
  const pending = (async () => {
    const url = new URL("https://ws.audioscrobbler.com/2.0/");
    url.search = new URLSearchParams({
      method: "user.getRecentTracks",
      user: config.username,
      api_key: config.apiKey,
      format: "json",
      limit: "200",
      page: String(page),
      ...(anchor ? { to: String(anchor) } : {}),
    }).toString();
    try {
      const response = await fetcher(url, {
        headers: { "User-Agent": "jpovinec.me/music (personal listening history)" },
        signal: AbortSignal.timeout(10_000),
      });
      if (!response.ok) throw new MusicRequestError("Listening history is temporarily unavailable.", 502);
      return parseRecentPage(await response.json());
    } catch (error) {
      responses.delete(cacheKey);
      if (error instanceof MusicRequestError) throw error;
      throw new MusicRequestError("Listening history is temporarily unavailable.", 502);
    }
  })();
  responses.set(cacheKey, { expiresAt: Date.now() + (anchor ? 300_000 : 30_000), pending });
  return pending;
}

export async function musicFeed(
  fetcher: typeof fetch,
  config: MusicConfig,
  view: "overview" | "wall",
  cursor: string | null = null,
): Promise<MusicFeed> {
  if (config.demo) {
    try { return demoFeed(config.username, view, cursor); }
    catch { throw new MusicRequestError("Invalid history cursor.", 400); }
  }
  const base: MusicFeed = {
    username: config.username,
    profileUrl: `https://www.last.fm/user/${encodeURIComponent(config.username)}`,
    source: config.apiKey ? "lastfm" : "unconfigured",
    nowPlaying: null,
    recentTracks: [],
    albums: [],
    nextCursor: null,
  };
  if (!config.apiKey) return base;
  if (view === "overview") {
    const latest = await recentPage(fetcher, config, 1);
    return { ...base,
      nowPlaying: latest.tracks.find((track) => track.isPlaying) ?? null,
      recentTracks: latest.tracks.filter((track) => !track.isPlaying).slice(0, 6),
    };
  }
  let page = 1;
  // Freeze pagination so new scrobbles don't move records between pages.
  let anchor = Math.floor(Date.now() / 30_000) * 30;
  if (cursor) {
    const match = /^(\d{1,6}):(\d{10})$/.exec(cursor);
    if (!match || Number(match[1]) < 1 || Number(match[2]) > Math.floor(Date.now() / 1000)) {
      throw new MusicRequestError("Invalid history cursor.", 400);
    }
    page = Number(match[1]);
    anchor = Number(match[2]);
  }
  const [history, current] = await Promise.all([
    recentPage(fetcher, config, page, anchor),
    page === 1 ? recentPage(fetcher, config, 1) : Promise.resolve(null),
  ]);
  const nowPlaying = current?.tracks.find((track) => track.isPlaying) ?? null;
  const albums = albumsFromTracks([
    ...(nowPlaying ? [nowPlaying] : []),
    ...history.tracks.filter((track) => !track.isPlaying),
  ]).filter((album) => album.image);
  return { ...base,
    nowPlaying,
    albums,
    nextCursor: page < history.totalPages ? `${page + 1}:${anchor}` : null,
  };
}
