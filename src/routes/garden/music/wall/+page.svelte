<script lang="ts">
  import { onMount, untrack } from "svelte";
  import AlbumCover from "../../../../components/AlbumCover.svelte";
  import {
    albumId,
    appendAlbums,
    relativeTime,
    type MusicFeed,
  } from "$lib/music";
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();
  const initial = untrack(() => data.feed);
  let albums = $state(initial.albums);
  let nextCursor = $state(initial.nextCursor);
  let playingId = $state(
    initial.nowPlaying?.album
      ? albumId(initial.nowPlaying.artist, initial.nowPlaying.album)
      : null,
  );
  let loading = $state(false);
  let error = $state(initial.message ?? "");
  let nearBottom = $state(false);
  let duplicateBatches = $state(0);
  let sentinel = $state<HTMLDivElement>();
  let now = $state(Date.now());
  let disposed = false;
  let request: AbortController | null = null;
  let refreshRequest: AbortController | null = null;

  $effect(() => {
    albums = data.feed.albums;
    nextCursor = data.feed.nextCursor;
    playingId = data.feed.nowPlaying?.album
      ? albumId(data.feed.nowPlaying.artist, data.feed.nowPlaying.album)
      : null;
    error = data.feed.message ?? "";
    duplicateBatches = 0;
  });

  async function loadMore() {
    if (loading || !nextCursor || disposed) return;
    loading = true;
    error = "";
    const cursor = nextCursor;
    request = new AbortController();
    try {
      const query = new URLSearchParams({ view: "wall", cursor });
      const response = await fetch(`/api/music?${query}`, {
        signal: request.signal,
      });
      const result = await response.json();
      if (disposed) return;
      if (!response.ok) throw new Error(result.message);
      const feed = result as MusicFeed;
      if (feed.nextCursor === cursor)
        throw new Error("The archive could not advance. Try again.");
      const updated = appendAlbums(albums, feed.albums);
      duplicateBatches =
        updated.length === albums.length ? duplicateBatches + 1 : 0;
      albums = updated;
      nextCursor = feed.nextCursor;
    } catch (cause) {
      if (!disposed)
        error =
          cause instanceof Error
            ? cause.message
            : "Older albums couldn't be loaded.";
    } finally {
      if (!disposed) loading = false;
    }
  }

  function retry() {
    duplicateBatches = 0;
    void loadMore();
  }

  $effect(() => {
    if (nearBottom && nextCursor && !loading && !error && duplicateBatches < 3)
      void loadMore();
  });

  onMount(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        nearBottom = entry.isIntersecting;
      },
      { rootMargin: "400px" },
    );
    if (sentinel) observer.observe(sentinel);
    const timer = window.setInterval(async () => {
      now = Date.now();
      if (document.visibilityState !== "visible") return;
      refreshRequest?.abort();
      refreshRequest = new AbortController();
      try {
        const response = await fetch("/api/music?view=overview", {
          signal: refreshRequest.signal,
        });
        if (!response.ok) throw new Error("Unavailable");
        const feed = (await response.json()) as MusicFeed;
        if (!disposed)
          playingId = feed.nowPlaying?.album
            ? albumId(feed.nowPlaying.artist, feed.nowPlaying.album)
            : null;
      } catch {
        if (!disposed) playingId = null;
      }
    }, 60_000);
    return () => {
      disposed = true;
      observer.disconnect();
      window.clearInterval(timer);
      request?.abort();
      refreshRequest?.abort();
    };
  });
</script>

<svelte:head>
  <title>Musicwall | jpovinec.me</title>
  <meta
    name="description"
    content="A wall of the albums I've been listening to, newest first."
  />
</svelte:head>

{#if data.feed.source === "demo"}
  <p class="sample-note">Sample listening history</p>
{/if}

<div class="album-wall" aria-label="Albums, most recently listened first">
  {#each albums as album, index (album.id)}
    <a
      class="album"
      class:is-playing={album.id === playingId}
      href={album.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${album.name} by ${album.artist}${album.id === playingId ? ", now listening" : `, ${relativeTime(album.playedAt, now)}`}`}
    >
      <AlbumCover image={album.image} loading={index < 6 ? "eager" : "lazy"} />
      <div class="album-details" aria-hidden="true">
        <p class="album-name">{album.name}</p>
        <p class="album-artist">{album.artist}</p>
        <p class="album-time">
          {album.id === playingId
            ? "Now listening"
            : relativeTime(album.playedAt, now)}
        </p>
      </div>
    </a>
  {/each}
</div>

<div
  class="archive-status"
  bind:this={sentinel}
  aria-live="polite"
  aria-busy={loading}
>
  {#if error}
    <p>{error}</p>
    {#if nextCursor}
      <button class="text-link" onclick={retry}> [Try again] </button>
    {:else}
      <a class="text-link" href="/garden/music/wall" data-sveltekit-reload>
        [Try again]
      </a>
    {/if}
  {:else if loading}
    <p>Loading older albums…</p>
  {:else if nextCursor}
    <button class="text-link" onclick={retry}>[Load older albums]</button>
  {:else if albums.length}
    <p>You've reached the beginning of this listening history.</p>
  {:else}
    <p>
      {data.feed.source === "unconfigured"
        ? "Listening history will be here soon."
        : "No albums to show yet."}
    </p>
  {/if}
</div>

<style>
  .sample-note {
    margin: 0;
    padding: 3px 12px 5px;
    color: var(--color-gray-500);
    font-size: 11px;
  }
  .album-wall {
    display: grid;
    grid-template-columns: repeat(6, minmax(0, 1fr));
    gap: 3px;
    padding: 3px;
  }
  .album {
    display: block;
    position: relative;
    aspect-ratio: 1;
    overflow: hidden;
    min-width: 0;
  }
  .album.is-playing::after {
    content: "";
    position: absolute;
    inset: 0;
    border: 3px solid var(--color-indigo-500);
    pointer-events: none;
  }
  .album:focus-visible {
    outline: 3px solid white;
    outline-offset: -6px;
  }
  .album-details {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 14px;
    color: white;
    background: rgb(0 0 0 / 78%);
    opacity: 0;
    transition: opacity 120ms ease;
    pointer-events: none;
  }
  .album:hover .album-details,
  .album:focus-visible .album-details {
    opacity: 1;
  }
  .album-name {
    font-weight: 500;
    font-size: 16px;
    line-height: 1.35;
  }
  .album-artist {
    font-size: 14px;
    line-height: 1.4;
    margin-top: 3px;
  }
  .album-time {
    font-size: 12px;
    line-height: 1.4;
    color: var(--color-gray-300);
    margin-top: 6px;
  }
  .archive-status {
    min-height: 72px;
    padding: 24px 16px;
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    color: var(--color-gray-500);
    font-size: 14px;
    text-align: center;
  }
  :global(.dark) .archive-status,
  :global(.dark) .sample-note {
    color: var(--color-gray-400);
  }
  @media (min-width: 1920px) {
    .album-wall {
      grid-template-columns: repeat(8, minmax(0, 1fr));
    }
  }
  @media (max-width: 1024px) {
    .album-wall {
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }
  }
  @media (max-width: 640px) {
    .album-wall {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
    .album-details {
      padding: 8px;
    }
    .album-name {
      font-size: 12px;
    }
    .album-artist {
      font-size: 11px;
    }
    .album-time {
      font-size: 10px;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .album-details {
      transition: none;
    }
  }
</style>
