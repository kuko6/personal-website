<script>
</script>

<svelte:head>
  <title>Blog - Jakub Povinec</title>
</svelte:head>
<div class="space-y-6">
  <h1 class=""><span class="rotated-underline">Blog</span></h1>
  <h2>Working on it... 👷</h2>
</div>

<style>
  .rotated-underline {
    @apply relative;
  }

  .rotated-underline::after {
    @apply absolute left-0 bottom-[-4px] w-full h-[6px] bg-current text-indigo-400;
    content: "";
    transform: rotate(2deg);
    transform-origin: left bottom;
  }
</style>
