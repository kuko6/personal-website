<script>
</script>

<svelte:head>
  <title>Garden | jpovinec.me</title>
</svelte:head>
  <!--
  Notes
    - make a md preprocessor
  Favourite things
    - music (make a spotify integration to show what I've been listening to or what I'm listening to rn)
      - inspo: https://io0.github.io/music/
    - films
  -->
<div class="space-y-5">
  <h1><span class="rotated-underline">Garden</span> 🪴</h1>
  <p class="leading-7">A collection of notes, interests, and other things.</p>

  <ul class="list-disc mx-6 space-y-2 font-plex">
    <li>
      <a class="text-link" href="/garden/music">[Music]</a>
      <span>- what I'm listening to, plus a musicwall of recently played albums.</span>
    </li>
  </ul>
</div>

<style>
  .rotated-underline {
    position: relative;
  }

  .rotated-underline::after {
    position: absolute;
    left: 0;
    bottom: -4px;
    width: 100%;
    height: 6px;
    background: var(--color-indigo-400);
    content: "";
    transform: rotate(-1deg);
    transform-origin: right bottom;
  }
</style>
