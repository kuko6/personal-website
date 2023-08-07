<script>
  import "../app.css";
  import { browser } from '$app/environment';
  // import { theme } from "$lib/stores";

  import githubLogoLight from "../assets/github_light.svg";
  import githubLogoDark from "../assets/github_dark.svg";
  import darkmode from "../assets/darkmode.svg";
  import lightmode from "../assets/lightmode.svg";
  
  import NavLink from "../components/NavLink.svelte";
  import NavIcon from "../components/NavIcon.svelte";

  let currentTheme;
  if (browser) {
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)')
	  currentTheme = prefersDarkMode.matches ? 'dark' : 'light'
  }
</script>

<header>
  <nav class="mx-40 pr-2.5 pt-12 dark:text-white">
    <div class="flex flex-row justify-end content-center text-base gap-5 font-inter font-extrabold">
      <NavLink label={"Home"} path={"/"} />
      <NavLink label={"Projects"} path={"/projects"} />
      <!-- <NavLink label={"Blog"} path={"/blog"} /> -->
      {#if currentTheme == 'dark'}
        <NavIcon icon={githubLogoDark} alt={"github logo"} path={"https://github.com/kuko6"} />
      {:else}
        <NavIcon icon={githubLogoLight} alt={"github logo"} path={"https://github.com/kuko6"} />
      {/if}
      <div class="border-l border-black dark:border-white my-2"/>
      {#if currentTheme == 'dark'}
        <NavIcon icon={lightmode} alt={"switch to light mode"} />
      {:else}
        <NavIcon icon={darkmode} alt={"switch to dark mode"} />
      {/if}
    </div>
  </nav>
</header>

<slot />

<footer>
  <div>
  </div>
</footer>

<style lang="postcss">
  :global(html) {
    @apply bg-stone-100 dark:bg-stone-800;
  }
</style>
