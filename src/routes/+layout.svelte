<script lang="ts">
  import "../app.css";
  import Navigation from "../components/Navigation.svelte";
  import { Confetti } from "svelte-confetti";

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
          <span class="font-plex">2025</span>
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
