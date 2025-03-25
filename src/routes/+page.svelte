<script>
  import "../app.css";

  let isHovering = false;

  function handleMouseEnter() {
    isHovering = true;
  }

  function handleMouseLeave() {
    isHovering = false;
  }

  function check() {
    console.log(isHovering);
  }
</script>

<svelte:head>
  <title>Home - Jakub Povinec</title>
</svelte:head>

<div
  class="space-y-6"
  role="group"
  on:mouseenter={handleMouseEnter}
  on:mouseleave={handleMouseLeave}
>
  <div class="space-y-3">
    <h1>
      Hi, I'm <span class="rotated-underline">Jakub</span> 👋
      <!-- Hi, I'm Jakub <span -->
        <!-- class={`${isHovering ? "animate-wiggle" : ""} inline-block`}>👋</span -->
      <!-- > -->
    </h1>
    <p class="leading-7">
      a software engineer from Bratislava, Slovakia.
    </p>
  </div>
  <div class="space-y-3">
    <h2>About me</h2>
    <div class="space-y-3">
      <p class="leading-7">
        Throughout my studies I’ve developed a passion for AI and
        computer vision, but I also enjoy working in other areas, such as
        backend or frontend development.
      </p>
      <p class="leading-7">
        While I have the most experience with Python and JavaScript, I also love
        experimenting with different languages and technologies and I’m eager to
        expand my knowledge and skills.
      </p>
      <p class="leading-7">
        Outside of coding I enjoy visiting art galleries and staying active through playing tennis or skiing.
      </p>
    </div>
  </div>
  <div class="space-y-3">
    <h2 class="">Featured Projects</h2>
      <ul class="list-disc mx-6">
        <li class="pb-1">
          <a class="project" href="https://www.github.com/kuko6/click-correction">
            [Click Correction]
          </a>
           - A two-stage segmentation method where an initial network is refined using user clicks via an auxiliary correction network.
        </li>
        <li>
          <a class="project" href="https://www.github.com/kuko6/style-transfer">
            [Style Transfer]
          </a>
           - Pytorch implementation of style transfer based on Adaptive Instance Normalization.
        </li>
      </ul>
  </div>
</div>

<style>
  .project {
    @apply text-indigo-500;
  }

  .project::-prefers-color-scheme-dark {
    @apply text-indigo-400;
  }

  .project:hover {
    @apply bg-indigo-500 text-white py-0.5;
  }

  .rotated-underline {
    @apply relative;
  }
  
  .rotated-underline::after {
    @apply absolute left-0 bottom-[-2px] w-full h-[6px] bg-current text-indigo-400;
    content: '';
    transform: rotate(-2deg);
    transform-origin: right bottom;
  }

</style>