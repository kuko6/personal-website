<script lang="ts">
  import { onMount, untrack } from "svelte";
  import AlbumCover from "../../../components/AlbumCover.svelte";
  import { relativeTime, type MusicFeed } from "$lib/music";
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();
  let feed = $state(untrack(() => data.feed));
  let now = $state(Date.now());
  let refreshing = $state(false);
  let controller: AbortController | null = null;
  let disposed = false;

  $effect(() => {
    feed = data.feed;
  });
  const featured = $derived(feed.nowPlaying ?? feed.recentTracks[0] ?? null);
  const recent = $derived(
    feed.nowPlaying
      ? feed.recentTracks.slice(0, 5)
      : feed.recentTracks.slice(1, 6),
  );

  async function refresh() {
    if (refreshing) return;
    refreshing = true;
    controller = new AbortController();
    try {
      const response = await fetch("/api/music?view=overview", {
        signal: controller.signal,
      });
      const result = await response.json();
      if (disposed) return;
      if (!response.ok) throw new Error(result.message);
      feed = result as MusicFeed;
      now = Date.now();
    } catch {
      if (!disposed)
        feed = {
          ...feed,
          nowPlaying: null,
          message: "Listening updates are temporarily unavailable.",
        };
    } finally {
      if (!disposed) refreshing = false;
    }
  }

  onMount(() => {
    const timer = window.setInterval(() => {
      now = Date.now();
      if (document.visibilityState === "visible") void refresh();
    }, 60_000);
    return () => {
      disposed = true;
      window.clearInterval(timer);
      controller?.abort();
    };
  });
</script>

<svelte:head>
  <title>Music | jpovinec.me</title>
  <meta
    name="description"
    content="What I'm listening to, and a musicwall of recently played albums."
  />
</svelte:head>

<div class="music-page">
  <!-- <nav class="mb-5 flex items-center gap-2.5 text-sm leading-normal text-gray-500 dark:text-gray-400" aria-label="Breadcrumb"> -->
  <!--   <a class="text-link" href="/garden">[Garden]</a> -->
  <!--   <span aria-hidden="true">/</span> -->
  <!--   <span>Music</span> -->
  <!-- </nav> -->

  <div class="flex items-center justify-between gap-5">
    <h1><span class="">Music</span></h1>
    <a class="text-link" href="/garden/music/wall">[Musicwall]</a>
  </div>
  <!-- <p class="mt-5 text-gray-500 dark:text-gray-400">A little corner for what I'm listening to.</p> -->
  {#if feed.message}
    <p class="mt-5 leading-[1.75] text-gray-500 dark:text-gray-400" role="status">
      {feed.message}
      <button
        class="text-link disabled:cursor-wait disabled:opacity-60"
        onclick={refresh}
        disabled={refreshing}
      >
        [Try again]
      </button>
    </p>
  {/if}

  {#if featured}
    <section
      class="mt-5 flex items-center gap-4"
      aria-label={feed.nowPlaying ? "Now listening" : "Last listened"}
    >
      <a
        class="featured-cover aspect-square shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-500"
        href={featured.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${featured.album || featured.name} by ${featured.artist} on Last.fm`}
      >
        <AlbumCover
          image={featured.image}
          alt={`${featured.album || featured.name} cover`}
          loading="eager"
        />
      </a>
      <div class="min-w-0">
        <p class="flex items-center gap-2 text-[11px] tracking-[0.12em] text-gray-500 uppercase dark:text-gray-400">
          {#if feed.nowPlaying}
            <span class="size-2 shrink-0 rounded-full bg-indigo-500" aria-hidden="true"></span>
          {/if}
          {feed.nowPlaying ? "Now listening" : "Last listened"}
        </p>
        <h2 class="track-name mt-2 leading-[1.2]">{featured.name}</h2>
        <p class="artist track-name mt-[7px] text-base leading-normal text-gray-500 dark:text-gray-400">
          {featured.artist}
          {#if featured.album}
            <span class="px-1.5" aria-hidden="true">·</span>
            {featured.album}
          {/if}
        </p>
        {#if !feed.nowPlaying && featured.playedAt}
          <time
            class="mt-1.5 block text-sm leading-normal text-gray-500 dark:text-gray-400"
            datetime={new Date(featured.playedAt).toISOString()}
          >
            {relativeTime(featured.playedAt, now)}
          </time>
        {/if}
        <!-- <a -->
        <!--   class="text-link mt-2.5 inline-block" -->
        <!--   href={featured.url} -->
        <!--   target="_blank" -->
        <!--   rel="noopener noreferrer" -->
        <!-- > -->
        <!--   [View on Last.fm] -->
        <!-- </a> -->
      </div>
    </section>
  {:else if !feed.message}
    <p class="mt-5 text-gray-500 dark:text-gray-400">
      {feed.source === "unconfigured"
        ? "Listening history will be here soon."
        : "No listening history yet."}
    </p>
  {/if}

  {#if recent.length}
    <section class="mt-5" aria-labelledby="recent-heading">
      <h2 id="recent-heading">Recently played</h2>
      <ul class="mt-3 list-none p-0">
        {#each recent as track, index (`${track.artist}:${track.name}:${track.playedAt}:${index}`)}
          <li class="recent-track grid items-center gap-x-3 border-t border-gray-200 py-1 first:border-t-0 dark:border-stone-700">
            <div class="recent-cover">
              <AlbumCover image={track.image} alt="" />
            </div>
            <div>
              <p class="track-name">
                <a
                  class="text-link"
                  href={track.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  [{track.name}]
                </a>
              </p>
              <p class="artist text-base leading-normal text-gray-500 dark:text-gray-400">{track.artist}</p>
            </div>
            {#if track.playedAt}
              <time
                class="played-at text-sm leading-normal whitespace-nowrap text-gray-500 dark:text-gray-400"
                datetime={new Date(track.playedAt).toISOString()}
              >
                {relativeTime(track.playedAt, now)}
              </time>
            {/if}
          </li>
        {/each}
      </ul>

      <a
        class="text-link mt-5 inline-block"
        href={feed.profileUrl}
        target="_blank"
        rel="noopener noreferrer">[More on Last.fm]</a
      >
    </section>
  {/if}
</div>

<style>
  .music-page {
    --featured-cover-size: 96px;
    --recent-cover-size: 36px;
  }

  .featured-cover {
    width: var(--featured-cover-size);
    flex-basis: var(--featured-cover-size);
  }

  .recent-track {
    grid-template-columns: var(--recent-cover-size) minmax(0, 1fr) auto;
  }

  .recent-cover {
    width: var(--recent-cover-size);
    height: var(--recent-cover-size);
  }

  .track-name {
    overflow-wrap: anywhere;
  }

  @media (max-width: 480px) {
    .music-page {
      --featured-cover-size: 80px;
      --recent-cover-size: 32px;
    }

    .artist {
      font-size: 14px;
    }

    .played-at {
      font-size: 12px;
    }
  }
</style>
