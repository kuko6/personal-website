<script>
  import GithubLogo from "./GithubLogo.svelte";
  import LightModeButton from "./LightModeButton.svelte"; 
  import DarkModeButton from "./DarkModeButton.svelte";
  import NavLink from "../components/NavLink.svelte";
  import NavIcon from "../components/NavIcon.svelte";
</script>

<nav class="mx-40 pr-2.5 pt-12 dark:text-white">
  <div class="flex flex-row justify-end content-center text-base gap-2 font-inter font-bold">
    <NavLink label={"Home"} path={"/"} />
    <NavLink label={"Projects"} path={"/projects"} />
   <!--  <NavLink label={"Blog"} path={"/blog"} />  -->
    <NavIcon alt={"github logo"} path={"https://github.com/kuko6"}> 
      <GithubLogo/>
    </NavIcon> 
    <div class="border-l border-black dark:border-white my-2"/>
    <LightModeButton />
    <DarkModeButton />
  </div>
</nav>
