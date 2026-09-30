<script lang="ts">
  let { image, alt = "", loading = "lazy" }: {
    image: string;
    alt?: string;
    loading?: "eager" | "lazy";
  } = $props();
  let failed = $state(false);

  $effect(() => {
    if (image !== undefined) failed = false;
  });
</script>

{#if image && !failed}
  <img class="cover" src={image} {alt} {loading} decoding="async" onerror={() => failed = true} />
{:else}
  <div class="missing-cover" role="img" aria-label={alt || "Album artwork unavailable"}>
    <span>Artwork unavailable</span>
  </div>
{/if}

<style>
  .cover {
    display: block;
    width: 100%;
    height: 100%;
    aspect-ratio: 1;
    object-fit: cover;
  }

  .missing-cover {
    display: flex;
    align-items: center;
    justify-content: center;
    aspect-ratio: 1;
    width: 100%;
    height: 100%;
    background: var(--color-stone-200);
    color: var(--color-stone-600);
    text-align: center;
  }

  .missing-cover span { font-size: 11px; line-height: 1.4; padding: 6px; }
  :global(.dark) .missing-cover { background: var(--color-stone-700); color: var(--color-stone-300); }
</style>
