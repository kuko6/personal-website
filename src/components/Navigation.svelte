<script>
  export let compact = false;
  import LightModeButton from "./LightModeButton.svelte";
  import DarkModeButton from "./DarkModeButton.svelte";
  import NavLink from "../components/NavLink.svelte";
</script>

<nav class={`${compact ? "" : "pt-5 md:pt-10"} dark:text-white`} aria-label="Main navigation">
  <div
    class="flex flex-row justify-end content-center gap-2"
  >
    <NavLink label={"Home"} path={"/"} />
    <NavLink label={"Projects"} path={"/projects"} />
    <NavLink label={"Garden"} path={"/garden"} />
    <!-- <NavLink label={"Blog"} path={"/blog"} /> -->
    <!-- <NavLink label={"Resume"} path={"/cv.pdf"} /> -->
    <div class="border-l-1 border-gray-700 dark:border-white my-2"></div>
    <LightModeButton />
    <DarkModeButton />
  </div>
</nav>
