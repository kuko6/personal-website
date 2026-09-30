import { loadMusic } from "$lib/server/load-music";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ fetch }) => ({ feed: await loadMusic(fetch, "wall") });
