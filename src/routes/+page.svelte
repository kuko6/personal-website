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
    <h1 class="font-inter font-black text-2xl md:text-4xl">
      Hi, I'm Jakub 👋
      <!-- Hi, I'm Jakub <span
        class={`${isHovering ? "animate-wiggle" : ""} inline-block`}>👋</span
      > -->
    </h1>
    <p class="font-inter leading-7">
      a software engineer from Bratislava, Slovakia.
    </p>
  </div>
  <div class="space-y-3 dark:text-white">
    <h2 class="font-inter font-extrabold text-xl md:text-2xl">About me</h2>
    <div class="space-y-3">
      <p class="font-inter leading-8">
        Throughout my studies I’ve developed a passion for AI and
        computer vision, but I also enjoy working in other areas, such as
        backend or frontend development.
      </p>
      <p class="font-inter leading-8">
        While I have the most experience with Python and JavaScript, I also love
        experimenting with different languages and technologies and I’m eager to
        expand my knowledge and skills.
      </p>
      <p class="font-inter leading-8">
        Outside of coding I enjoy visiting art galleries and staying active through playing tennis or skiing.
      </p>
    </div>
  </div>
</div>
