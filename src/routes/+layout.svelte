<script>
  import "../app.css";
  import Navigation from "../components/Navigation.svelte";
  import { Confetti } from "svelte-confetti";

  let easterEgg = false;
  function foundEasterEgg() {
    easterEgg = !easterEgg;
  }

  let currentDate = new Date();
  let targetDate = new Date(currentDate.getFullYear(), 9, 27);
</script>

<header>
  <Navigation />
</header>

<main class="flex-1 h-full">
  {#if easterEgg}
    <div class="confetti">
      <Confetti x={[-5, 5]} y={[0, 0.1]} delay={[0, 10000]} duration=5000 amount=300 iterationCount=infinite fallDistance="100vh" /> 
    </div>
  {:else if currentDate.toDateString() === targetDate.toDateString()}
    <div class="confetti">
      <Confetti x={[-5, 5]} y={[0, 0.1]} delay={[0, 10000]} duration=5000 amount=300 iterationCount=2 fallDistance="100vh" /> 
    </div>
  {/if}
  <slot />
</main>

<footer class="fixed bottom-0 w-full my-10">
  <div class="flex items-center justify-center text-gray-400 dark:text-gray-500">
    <a class="hover:underline underline-offset-2 decoration-blue-400" 
      href="https://github.com/kuko6/kuko">made by Kuko
    </a> 
    <span class="group" role="button" on:click={foundEasterEgg}>, 2023</span>
  </div>
</footer>

<style lang="postcss">
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
