<script>
  import "../app.css";
  import githubLogo from "../assets/github.svg";
  import darkmode from "../assets/darkmode.svg";
</script>

<header>
  <nav class="mx-40 pr-2.5 pt-16">
    <div class="flex flex-row justify-end content-center gap-5 font-inter text-lg font-extrabold">
      <a class="p-1 hover:bg-slate-100 rounded-md" href="/">Home</a>
      <a class="p-1 hover:bg-slate-100 rounded-md" href="/projects">Projects</a>
      <!-- <a href="/blog">Blog</a> -->
      <a class="flex flex-col justify-center p-1 hover:bg-slate-100 rounded-md" href="https://github.com/kuko6">
        <img alt="github logo" src={githubLogo} width="18" height="18">
      </a>
      <div class="border-l border-black my-1"/>
      <a class="flex flex-col justify-center p-1 hover:bg-slate-100 rounded-md" href="https://github.com/kuko6">
        <img alt="github logo" src={darkmode} width="18" height="18">
      </a>
    </div>
  </nav>
</header>

<slot />

<!-- <style lang="postcss">
  :global(html) {
    background-color: theme(colors.stone.100);
  }
</style> -->
