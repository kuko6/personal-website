<script>
  import { theme } from "$lib/stores";  

  import GithubLogo from "./GithubLogo.svelte";
  import LightModeIcon from "./LightModeIcon.svelte"; 
  import DarkModeIcon from "./DarkModeIcon.svelte";

  import NavLink from "../components/NavLink.svelte";
  import NavIcon from "../components/NavIcon.svelte";
</script>

<nav class="mx-40 pr-2.5 pt-12 dark:text-white">
  <div class="flex flex-row justify-end content-center text-base gap-5 font-inter font-extrabold">
    <NavLink label={"Home"} path={"/"} />
    <NavLink label={"Projects"} path={"/projects"} />
    <!-- <NavLink label={"Blog"} path={"/blog"} /> -->
    <NavIcon alt={"github logo"} path={"https://github.com/kuko6"}> 
      <GithubLogo/>
    </NavIcon> 
    <div class="border-l border-black dark:border-white my-2"/>
    
    <div class="dark-toggle"><NavIcon alt={"switch to lightmode"}><LightModeIcon/></NavIcon></div>
    <div class="light-toggle"><NavIcon alt={"switch to darkmode"}><DarkModeIcon/></NavIcon></div>
    
    <!-- {#if $theme == 'dark'}
      <NavIcon alt={"switch to lightmode"}> 
        <LightModeIcon/> 
      </NavIcon>
    {:else}
      <NavIcon alt={"switch to darkmode"}> 
        <DarkModeIcon/>
      </NavIcon>
    {/if} -->
  </div>
</nav>

<style lang="postcss">
  :global(.dark) .light-toggle {
    display: none
  }

  :global(.light) .dark-toggle {
    display: none
  }
</style>