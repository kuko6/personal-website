<script>
  import "../app.css";
  // import { browser } from '$app/environment';
  import { onMount } from "svelte";
  import { theme } from "$lib/stores";
  import Navigation from "../components/Navigation.svelte";

  onMount(() => {
    const prefersdarkmode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (sessionStorage.theme === 'dark' || !('theme' in sessionStorage) && prefersdarkmode) {
      theme.set('dark');
    } else {
      theme.set('light');
    }
  });

</script>

<header>
  <Navigation />
</header>

<slot />

<footer>
  <div>
  </div>
</footer>

<!-- <style lang="postcss">
</style> -->
