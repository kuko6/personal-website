<script>
  import "../app.css";
</script>

<svelte:head>
  <title>jpovinec.me</title>
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
        I'm currently working as a research engineer in cancer biology, where I
        develop tools and pipelines for analysing biomedical data. I mostly work
        with Python, R and JavaScript, but I also enjoy experimenting with new
        languages and building full-stack projects in my free time.
      </p>
      <p class="leading-7">
        Outside of coding, I like visiting art galleries, playing tennis,
        skiing, and hiking.
      </p>
      <br />
      <p class="leading-7">
        You can find me on:
        <a
          href="https://github.com/kuko6"
          class="link text-indigo-500 dark:text-indigo-400">[GitHub]</a
        >
        <a
          href="https://mas.to/@kuko6"
          class="link text-indigo-500 dark:text-indigo-400">[Mastodon]</a
        >
        <!-- <a -->
        <!--   href="https://bsky.app/profile/kuko6.bsky.social" -->
        <!--   class="link text-indigo-500 dark:text-indigo-400">[Bluesky]</a -->
        <!-- > -->
        <a
          href="https://www.linkedin.com/in/jakub-povinec/"
          class="link text-indigo-500 dark:text-indigo-400">[LinkedIn]</a
        >
      </p>
    </div>
  </div>
  <div class="space-y-3">
    <h2 class="">Featured Projects</h2>
    <ul class="list-disc mx-6">
      <li class="pb-1">
        <a
          class="link text-indigo-500 dark:text-indigo-400"
          href="https://www.github.com/kuko6/click-correction"
        >
          [Click Correction]
        </a>
        <span class="font-plex">
          - A two-stage segmentation method where an initial network is refined
          using user clicks through an auxiliary correction network.
        </span>
      </li>
      <li>
        <a
          class="link text-indigo-500 dark:text-indigo-400"
          href="https://www.github.com/kuko6/style-transfer"
        >
          [Style Transfer]
        </a>
        <span class="font-plex">
          - A Pytorch implementation of style transfer based on Adaptive
          Instance Normalization.
        </span>
      </li>
    </ul>
  </div>
</div>

<style>
  @reference "../app.css";

  .link {
    /* @apply text-indigo-500 dark:bg-indigo-400; */
  }

  .link:hover {
    @apply bg-indigo-500 text-white;
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
