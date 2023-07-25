<script>
  import "../app.css";
  import githubLogo from "../assets/github.svg";
</script>

<header>
  <nav>
    <a href="/">Home</a>
    <a href="/projects">Projects</a>
    <a href="/blog">Blog</a>
    <a href="https://github.com/kuko6">
      <img alt="github logo" src={githubLogo}>
    </a>
  </nav>
</header>

<slot />

<!-- <style lang="postcss">
  :global(html) {
    background-color: theme(colors.blue.100);
  }
</style> -->
