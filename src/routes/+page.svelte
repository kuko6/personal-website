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
  <div class="space-y-3 dark:text-white">
    <h1>
      Hi, I'm Jakub 👋
      <!-- Hi, I'm Jakub <span -->
        <!-- class={`${isHovering ? "animate-wiggle" : ""} inline-block`}>👋</span -->
      <!-- > -->
    </h1>
    <p class="font-inter leading-7">
      a software engineer from Bratislava, Slovakia.
    </p>
  </div>
  <div class="space-y-3 dark:text-white">
    <h2>About me</h2>
    <div class="space-y-3">
      <p class="font-inter leading-7">
        Throughout my studies I’ve developed a passion for AI and
        computer vision, but I also enjoy working in other areas, such as
        backend or frontend development.
      </p>
      <p class="font-inter leading-7">
        While I have the most experience with Python and JavaScript, I also love
        experimenting with different languages and technologies and I’m eager to
        expand my knowledge and skills.
      </p>
      <p class="font-inter leading-7">
        Outside of coding I enjoy visiting art galleries and staying active through playing tennis or skiing.
      </p>
    </div>
  </div>
  <div class="space-y-3">
    <h2 class="dark:text-white">Featured Projects</h2>
      <ul class="list-disc mx-6 dark:text-white">
        <li class="pb-1">
          <a class="text-indigo-600 dark:text-indigo-400 hover:underline decoration-2 underline-offset-2" href="https://www.github.com/kuko6/click-correction">
            Click Correction
          </a>
           - A two-stage segmentation method where an initial network is refined using user clicks via an auxiliary correction network.
        </li>
        <li>
          <a class="text-indigo-600 dark:text-indigo-400 hover:underline decoration-2 underline-offset-2" href="https://www.github.com/kuko6/style-transfer">
            Style Transfer
          </a>
           - Pytorch implementation of style transfer based on Adaptive Instance Normalization.
        </li>
      </ul>
  </div>
</div>
