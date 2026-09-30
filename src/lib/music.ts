export type MusicSource = "demo" | "lastfm" | "unconfigured";

export interface MusicTrack {
  name: string;
  artist: string;
  album: string;
  image: string;
  url: string;
  playedAt: number | null;
  isPlaying: boolean;
}

export interface MusicAlbum {
  id: string;
  name: string;
  artist: string;
  image: string;
  url: string;
  playedAt: number | null;
  isPlaying: boolean;
  track: string;
}

export interface MusicFeed {
  username: string;
  profileUrl: string;
  source: MusicSource;
  nowPlaying: MusicTrack | null;
  recentTracks: MusicTrack[];
  albums: MusicAlbum[];
  nextCursor: string | null;
  message?: string;
}

export function albumId(artist: string, album: string): string {
  return [artist, album]
    .map((value) => value.normalize("NFKC").trim().toLowerCase())
    .join("\u0000");
}

export function albumUrl(artist: string, album: string): string {
  return `https://www.last.fm/music/${encodeURIComponent(artist)}/${encodeURIComponent(album)}`;
}

export function albumsFromTracks(tracks: MusicTrack[]): MusicAlbum[] {
  const albums = new Map<string, MusicAlbum>();
  for (const track of tracks) {
    if (!track.album.trim()) continue;
    const id = albumId(track.artist, track.album);
    const previous = albums.get(id);
    if (!previous) {
      albums.set(id, {
        id,
        name: track.album,
        artist: track.artist,
        image: track.image,
        url: albumUrl(track.artist, track.album),
        playedAt: track.playedAt,
        isPlaying: track.isPlaying,
        track: track.name,
      });
    } else {
      if (!previous.image && track.image) previous.image = track.image;
      if (previous.playedAt === null && track.playedAt !== null) {
        previous.playedAt = track.playedAt;
      }
      if (track.isPlaying) {
        previous.isPlaying = true;
        previous.track = track.name;
      }
    }
  }
  return [...albums.values()];
}

export function appendAlbums(current: MusicAlbum[], older: MusicAlbum[]): MusicAlbum[] {
  const seen = new Set(current.map((album) => album.id));
  return [...current, ...older.filter((album) => {
    if (seen.has(album.id)) return false;
    seen.add(album.id);
    return true;
  })];
}

export function relativeTime(playedAt: number | null, now = Date.now()): string {
  if (playedAt === null) return "";
  const minutes = Math.max(0, Math.floor((now - playedAt) / 60_000));
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} ${hours === 1 ? "hr" : "hrs"} ago`;
  const days = Math.floor(hours / 24);
  if (days === 1) return "yesterday";
  if (days < 7) return `${days} days ago`;
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    ...(days > 365 ? { year: "numeric" as const } : {}),
  }).format(playedAt);
}
