<script>
  import "../app.css";
</script>

<svelte:head>
  <title>Home - Jakub Povinec</title>
</svelte:head>

<div class="space-y-6">
  <div class="space-y-3">
    <h1>
      Hi, I'm <span class="rotated-underline">Jakub</span> 👋
    </h1>
    <p class="leading-7">a software engineer from Bratislava, Slovakia.</p>
  </div>
  <div class="space-y-3">
    <h2>About me</h2>
    <div class="space-y-3">
      <p class="leading-7">
        I’m passionate about AI and Computer Vision, but also enjoy working on full-stack projects.
        I primarily use Python and JavaScript, and love experimenting with new languages and technologies.
        Beyond coding, I enjoy visiting art galleries, playing tennis, hiking, and skiing.
      </p>
      <p class="leading-7">
        You can also find me on:
        <a href="https://mas.to/@kuko6" class="link text-indigo-500 dark:text-indigo-400">[Mastodon]</a>
        <a href="https://bsky.app/profile/kuko6.bsky.social" class="link text-indigo-500 dark:text-indigo-400">[Bluesky]</a>
        <a href="https://www.linkedin.com/in/jakub-povinec/" class="link text-indigo-500 dark:text-indigo-400">[LinkedIn]</a>
      </p>
    </div>
  </div>
  <div class="space-y-3">
    <h2 class="">Featured Projects</h2>
    <ul class="list-disc mx-6">
      <li class="pb-1">
        <a class="link text-indigo-500 dark:text-indigo-400" href="https://www.github.com/kuko6/click-correction">
          [Click Correction]
        </a>
        <span>- A two-stage segmentation method where an initial network is refined
          using user clicks via an auxiliary correction network.</span>
      </li>
      <li>
        <a class="link text-indigo-500 dark:text-indigo-400" href="https://www.github.com/kuko6/style-transfer">
          [Style Transfer]
        </a>
        <span>- Pytorch implementation of style transfer based on Adaptive Instance
          Normalization.</span>
      </li>
    </ul>
  </div>
</div>

<style>
  @reference "../app.css";

  .link {
    /* @apply text-indigo-500; */
  }

  /* .link::-prefers-color-scheme-dark {
    @apply text-indigo-400;
  } */

  .link:hover {
    @apply bg-indigo-500 text-white py-0.5;
  }

  .rotated-underline {
    @apply relative;
  }

  .rotated-underline::after {
    @apply absolute left-0 bottom-[-2px] w-full h-[6px] bg-current text-indigo-400;
    content: "";
    transform: rotate(-2deg);
    transform-origin: right bottom;
  }
</style>
