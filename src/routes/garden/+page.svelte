<script>
</script>

<svelte:head>
  <title>Blog - Jakub Povinec</title>
</svelte:head>
<div class="space-y-6">
  <!--
  Notes
    - make a md preprocessor
  Favourite things
    - music (make a spotify integration to show what I've been listening to or what I'm listening to rn)
      - inspo: https://io0.github.io/music/
    - films
  -->
  <h1 class="">Garden 🪴</h1>
  <!-- <ul class="list-disc mx-6 space-y-2">
    <li>Some Notes</li>
    <li>Fav things</li>
  </ul> -->
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
