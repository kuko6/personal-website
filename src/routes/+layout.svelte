<script lang="ts">
  import "../app.css";
  import { page } from "$app/state";
  import type { Snippet } from "svelte";
  import Navigation from "../components/Navigation.svelte";
  import LightModeButton from "../components/LightModeButton.svelte";
  import DarkModeButton from "../components/DarkModeButton.svelte";
  import { Confetti } from "svelte-confetti";
  import { createChickenEasterEgg } from "./chickenEasterEgg.svelte.js";

  let { children }: { children: Snippet } = $props();
  const isMusicwall = $derived(page.url.pathname === "/garden/music/wall");

  const {
    state: chicken,
    elements: chickenElements,
    trackCursor,
    handleKeydown,
    popChicken,
    forgetCursor,
  } = createChickenEasterEgg();

  const currentDate = new Date();
  const bdayDate = new Date(currentDate.getFullYear(), 9, 27);

  let confetti = $state(false);
  function enableConfetti() {
    confetti = !confetti;
  }

  let isVisible = $state(true);
  let isHovering = false;
  function handleMouseEnter() {
    isHovering = true;
    let a = setTimeout(() => {
      if (isHovering) isVisible = false;
    }, 2500);
  }

  function handleMouseLeave() {
    isHovering = false;
    if (!confetti) isVisible = true;
  }
</script>

<svelte:head>
  <link rel="preload" href="/images/chicken-pop.svg" as="image" />
</svelte:head>

<svelte:window
  onpointermove={trackCursor}
  onkeydown={handleKeydown}
  onblur={forgetCursor}
/>

<div
  class={`flex flex-col min-h-screen mx-auto w-full ${isMusicwall ? "" : "px-4 md:px-0 md:max-w-3xl"}`}
>
  <header class:wall-header={isMusicwall}>
    {#if isMusicwall}
      <nav
        class="wall-breadcrumb font-plex text-base font-medium"
        aria-label="Breadcrumb"
      >
        <a href="/garden/music" class="text-link">[Music]</a>
        <span class="font-plex" aria-hidden="true">/</span>
        <h1 class="font-plex text-base font-medium">
          <span class="rotated-underline font-plex">Musicwall</span>
        </h1>
      </nav>
      <div
        class="flex items-center gap-2"
        role="group"
        aria-label="Color theme"
      >
        <LightModeButton />
        <DarkModeButton />
      </div>
    {:else}
      <Navigation />
    {/if}
  </header>

  <main class={`grow ${isMusicwall ? "" : "pt-4 md:pt-8"}`}>
    {#if confetti}
      <div class="confetti">
        <Confetti
          disableForReducedMotion
          x={[-5, 5]}
          y={[0, 0.1]}
          delay={[0, 10000]}
          duration={6800}
          amount={310}
          iterationCount="infinite"
          fallDistance="120vh"
        />
      </div>
    {:else if new Date().getMonth() === 11}
      <div class="confetti">
        <Confetti
          rounded
          disableForReducedMotion
          x={[-5, 5]}
          y={[0, 0.1]}
          delay={[0, 10000]}
          duration={9000}
          colorArray={["#b9ecff", "#9ae4ff", "#e3f7ff"]}
          amount={100}
          iterationCount="infinite"
          fallDistance="100vh"
        />
      </div>
    {:else if currentDate.toDateString() === bdayDate.toDateString()}
      <div class="confetti">
        <Confetti
          disableForReducedMotion
          x={[-5, 5]}
          y={[0, 0.1]}
          delay={[0, 10000]}
          duration={6800}
          amount={310}
          iterationCount={2}
          fallDistance="120vh"
        />
      </div>
    {/if}
    {@render children()}
  </main>

  {#if !isMusicwall}
    <footer class="pb-10 pt-16 h-full w-full leading-7">
      <div
        class="container mx-auto flex items-center justify-center text-gray-400 dark:text-gray-500"
        role="group"
        onmouseenter={handleMouseEnter}
        onmouseleave={handleMouseLeave}
      >
        <a
          class="hover-rotated-underline font-plex text-sm"
          href="https://github.com/kuko6/personal-website"
        >
          made by Jakub Povinec,
        </a>

        <div class="pl-1 text-sm flex items-center h-5">
          {#if isVisible}
            <span class="font-plex">2026</span>
          {:else}
            <button
              class={confetti ? "animate-wiggle" : ""}
              onclick={enableConfetti}
              style="line-height: 1;"
            >
              🎉
            </button>
          {/if}
        </div>
      </div>
    </footer>
  {/if}
</div>

{#if chicken.phase === "jumping" || chicken.phase === "following" || chicken.phase === "popping"}
  <button
    bind:this={chickenElements.follower}
    class="chicken-follower"
    class:chicken-jumping={chicken.phase === "jumping"}
    style:transform={`translate3d(${chicken.position.x}px, ${chicken.position.y}px, 0)`}
    aria-label="Send the chicken home"
    title="Click to send me home"
    onclick={popChicken}
  >
    {#if chicken.phase === "popping"}
      <span class="chicken-pop-sprite" aria-hidden="true"></span>
    {:else}
      <span class="chicken-hop">
        <span
          class="chicken-sprite"
          class:chicken-moving={chicken.moving}
          style:--chicken-sprite={`url("${chicken.sprite}")`}
          style:transform={`scaleX(${chicken.facing})`}
        ></span>
      </span>
    {/if}
  </button>
{/if}

<style>
  @reference "../app.css";

  .wall-header {
    position: sticky;
    top: 0;
    z-index: 10;
    min-height: 48px;
    padding: 6px 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 4px 16px;
    background: var(--color-soft-beige, #fffefb);
  }

  :global(.dark) .wall-header {
    background: var(--color-stone-800);
  }
  .wall-breadcrumb {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .rotated-underline {
    position: relative;
  }

  .rotated-underline::after {
    position: absolute;
    left: 0;
    bottom: -3px;
    width: 100%;
    height: 4px;
    background: var(--color-indigo-400);
    content: "";
    transform: rotate(-2deg);
    transform-origin: right bottom;
  }

  .hover-rotated-underline {
    @apply relative;
  }
  .hover-rotated-underline::after {
    @apply absolute left-0 bottom-[-1px] w-full h-[2px] bg-current
           opacity-0;
    content: "";
    transform: rotate(0.5deg);
    transform-origin: left bottom;
  }
  .hover-rotated-underline:hover::after {
    @apply opacity-100 text-indigo-400;
  }

  /* Shared with the ChickenRun trigger on the Projects page. */
  :global(.chicken-project) {
    display: inline-block;
    position: relative;
  }

  :global(.chicken-peek) {
    background: none;
    border: 0;
    bottom: calc(100% - 5px);
    cursor: pointer;
    height: 26px;
    left: calc(100% - 24px);
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 40px;
    z-index: 2;
  }

  :global(.chicken-peek:focus-visible),
  :global(.chicken-follower:focus-visible) {
    border-radius: 4px;
    outline: 2px solid currentColor;
    outline-offset: 2px;
  }

  :global(.chicken-sprite) {
    background-image: var(--chicken-sprite, url("/images/chicken.png"));
    background-position: 0 -120px;
    background-repeat: no-repeat;
    background-size: 160px 200px;
    display: block;
    height: 40px;
    image-rendering: pixelated;
    width: 40px;
  }

  :global(.chicken-peek .chicken-sprite) {
    animation: chicken-peek 260ms ease-out both;
    transform: translateY(8px);
  }

  @keyframes -global-chicken-peek {
    from {
      transform: translateY(26px);
    }

    to {
      transform: translateY(8px);
    }
  }

  :global(.chicken-follower) {
    background: none;
    border: 0;
    cursor: pointer;
    height: 40px;
    left: 0;
    padding: 0;
    position: fixed;
    top: 0;
    width: 40px;
    z-index: 50;
  }

  :global(.chicken-hop) {
    display: block;
  }

  :global(.chicken-follower .chicken-sprite:not(.chicken-moving)) {
    background-position: 0 0;
  }

  :global(.chicken-jumping .chicken-hop) {
    animation: chicken-jump 420ms ease-out both;
  }

  :global(.chicken-moving) {
    animation: chicken-run 200ms steps(2) infinite;
  }

  .chicken-pop-sprite {
    background: url("/images/chicken-pop.svg") no-repeat 0 0 / 160px 40px;
    display: block;
    width: 40px;
    height: 40px;
    image-rendering: pixelated;
    animation: chicken-pop 320ms steps(1) both;
  }

  @keyframes -global-chicken-pop {
    0% {
      background-position: 0 0;
    }

    25% {
      background-position: -40px 0;
    }

    50% {
      background-position: -80px 0;
    }

    75%,
    100% {
      background-position: -120px 0;
    }
  }

  @keyframes -global-chicken-run {
    to {
      background-position: -80px -120px;
    }
  }

  @keyframes -global-chicken-jump {
    0%,
    100% {
      transform: translateY(0);
    }

    45% {
      transform: translateY(-32px);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    :global(.chicken-peek .chicken-sprite),
    :global(.chicken-jumping .chicken-hop),
    .chicken-pop-sprite,
    :global(.chicken-moving) {
      animation: none;
    }
  }

  .confetti {
    position: fixed;
    top: -50px;
    left: 0;
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    overflow: hidden;
    pointer-events: none;
  }
</style>
