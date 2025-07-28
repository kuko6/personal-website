<script>
</script>

<svelte:head>
  <title>Blog - Jakub Povinec</title>
</svelte:head>
<div class="space-y-5">
  <h1><span class="rotated-underline">Blog</span></h1>
  <h2>Working on it... 👷</h2>
</div>

<style>
  @reference "../../app.css";
    
  .rotated-underline {
    @apply relative;
  }

  .rotated-underline::after {
    @apply absolute left-0 bottom-[-6px] w-full h-[6px] bg-current text-indigo-400;
    content: '';
    transform: rotate(-2.5deg);
    transform-origin: right bottom;
  }
</style>
