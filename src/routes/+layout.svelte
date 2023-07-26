<script>
  import "../app.css";

  import githubLogo from "../assets/github.svg";
  import darkmode from "../assets/darkmode.svg";
  
  import NavLink from "../components/NavLink.svelte";
  import NavIcon from "../components/NavIcon.svelte";
</script>

<header>
  <nav class="mx-40 pr-2.5 pt-12">
    <div class="flex flex-row justify-end content-center text-base gap-5 font-inter font-extrabold">
      <NavLink label={"Home"} path={"/"} />
      <NavLink label={"Projects"} path={"/projects"} />
      <!-- <NavLink label={"Blog"} path={"/blog"} /> -->
      <NavIcon icon={githubLogo} alt={"github logo"} path={"https://github.com/kuko6"} />
      <div class="border-l border-black my-2"/>
      <NavIcon icon={darkmode} alt={"change theme button"} />
    </div>
  </nav>
</header>

<slot />

<!-- <style lang="postcss">
  :global(html) {
    background-color: theme(colors.stone.100);
  }
</style> -->
