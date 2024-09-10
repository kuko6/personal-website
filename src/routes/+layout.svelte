<script>
  import "../app.css";
  import Navigation from "../components/Navigation.svelte";
  import { Confetti } from "svelte-confetti";

  let confetti = false;
  let currentDate = new Date();
  let targetDate = new Date(currentDate.getFullYear(), 9, 27);

  function party() {
    confetti = !confetti;
  }

  let isVisible = true;
  let isHovering = false;

  function handleMouseEnter() {
    isHovering = true;
    let a = setTimeout(() => {
      if (isHovering) isVisible = false;
    }, 1250);
  }

  function handleMouseLeave() {
    isHovering = false;
    if (!confetti) isVisible = true;
  }
</script>

<div class="flex flex-col min-h-screen mx-auto px-4 md:px-0 md:max-w-3xl">
  <header>
    <Navigation />
  </header>

  <main class="flex-grow pt-6 md:pt-14">
    {#if confetti}
      <div class="confetti">
        <Confetti
          x={[-5, 5]}
          y={[0, 0.1]}
          delay={[0, 10000]}
          duration="5000"
          amount="300"
          iterationCount="infinite"
          fallDistance="100vh"
        />
      </div>
    {:else if currentDate.toDateString() === targetDate.toDateString()}
      <div class="confetti">
        <Confetti
          x={[-5, 5]}
          y={[0, 0.1]}
          delay={[0, 10000]}
          duration="5000"
          amount="300"
          iterationCount="2"
          fallDistance="100vh"
        />
      </div>
    {/if}
    <slot />
  </main>

  <footer class="py-10">
    <div
      class="container mx-auto flex items-center justify-center text-gray-400 dark:text-gray-500"
      role="group"
      on:mouseenter={handleMouseEnter}
      on:mouseleave={handleMouseLeave}
    >
      <a
        class="hover:underline underline-offset-2 decoration-blue-400"
        href="https://github.com/kuko6/kuko"
      >
        made by Kuko,
      </a>
      <div class="pl-1">
        {#if isVisible}
          <span>2024</span>
        {:else}
          <button class={confetti ? "animate-wiggle" : ""} on:click={party}
            >🎉</button
          >
        {/if}
      </div>
    </div>
  </footer>
</div>

<style>
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
