import type { MusicFeed } from "../music";

export async function loadMusic(fetcher: typeof fetch, view: "overview" | "wall"): Promise<MusicFeed> {
  const response = await fetcher(`/api/music?view=${view}`);
  const data = await response.json();
  if (response.ok) return data as MusicFeed;
  return {
    username: "kuko6",
    profileUrl: "https://www.last.fm/user/kuko6",
    source: "lastfm",
    nowPlaying: null,
    recentTracks: [],
    albums: [],
    nextCursor: null,
    message: typeof data.message === "string" ? data.message : "Listening history is temporarily unavailable.",
  };
}
