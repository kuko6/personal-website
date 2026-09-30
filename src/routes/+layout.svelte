<script lang="ts">
  import "../app.css";
  import Navigation from "../components/Navigation.svelte";
  import { Confetti } from "svelte-confetti";
  import { createChickenEasterEgg } from "./chickenEasterEgg.svelte.js";

  const {
    state: chicken,
    elements: chickenElements,
    trackCursor,
    handleKeydown,
    hideChicken,
    forgetCursor,
  } = createChickenEasterEgg();

  const currentDate = new Date();
  const bdayDate = new Date(currentDate.getFullYear(), 9, 27);

  let confetti = false;
  function enableConfetti() {
    confetti = !confetti;
  }

  let isVisible = true;
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

<svelte:window
  on:pointermove={trackCursor}
  on:keydown={handleKeydown}
  on:blur={forgetCursor}
/>

<div
  class="flex flex-col min-h-screen mx-auto px-4 md:px-0 md:max-w-3xl w-full"
>
  <header>
    <Navigation />
  </header>

  <main class="grow pt-4 md:pt-8">
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
    <slot />
  </main>

  <footer class="pb-10 pt-16 h-full w-full leading-7">
    <div
      class="container mx-auto flex items-center justify-center text-gray-400 dark:text-gray-500"
      role="group"
      on:mouseenter={handleMouseEnter}
      on:mouseleave={handleMouseLeave}
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
            on:click={enableConfetti}
            style="line-height: 1;"
          >
            🎉
          </button>
        {/if}
      </div>
    </div>
  </footer>
</div>

{#if chicken.phase === "jumping" || chicken.phase === "following"}
  <button
    bind:this={chickenElements.follower}
    class="chicken-follower"
    class:chicken-jumping={chicken.phase === "jumping"}
    style:transform={`translate3d(${chicken.position.x}px, ${chicken.position.y}px, 0)`}
    aria-label="Send the chicken home"
    title="Click to send me home"
    on:click={hideChicken}
  >
    <span class="chicken-hop">
      <span
        class="chicken-sprite"
        class:chicken-moving={chicken.moving}
        style:--chicken-sprite={`url("${chicken.sprite}")`}
        style:transform={`scaleX(${chicken.facing})`}
      ></span>
    </span>
  </button>
{/if}

<style>
  @reference "../app.css";

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

  @keyframes -global-chicken-run {
    to {
      background-position: -80px -120px;
    }
  }

  @keyframes -global-chicken-jump {
    0%, 100% {
      transform: translateY(0);
    }

    45% {
      transform: translateY(-32px);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    :global(.chicken-peek .chicken-sprite),
    :global(.chicken-jumping .chicken-hop),
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
