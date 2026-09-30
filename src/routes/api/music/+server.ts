import { dev } from "$app/environment";
import { env } from "$env/dynamic/private";
import { json } from "@sveltejs/kit";
import { musicFeed, MusicRequestError } from "$lib/server/lastfm";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({ fetch, url, platform }) => {
  const view = url.searchParams.get("view") ?? "overview";
  if (view !== "overview" && view !== "wall") {
    return json({ message: "Unknown music view." }, { status: 400 });
  }
  const bindings = (platform as { env?: Record<string, unknown> } | undefined)?.env;
  const value = (name: string) => typeof bindings?.[name] === "string"
    ? bindings[name] as string : env[name] ?? "";
  const apiKey = value("LASTFM_API_KEY");
  try {
    const feed = await musicFeed(fetch, {
      username: value("LASTFM_USERNAME") || "kuko6",
      apiKey,
      demo: value("MUSIC_DEMO") === "true" || (dev && !apiKey),
    }, view, url.searchParams.get("cursor"));
    return json(feed, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    const status = error instanceof MusicRequestError ? error.status : 502;
    const message = error instanceof MusicRequestError ? error.message
      : "Listening history is temporarily unavailable.";
    return json({ message }, { status, headers: { "Cache-Control": "no-store" } });
  }
};
