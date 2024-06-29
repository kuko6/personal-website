<svelte:head>
  <title>Projects - Kuko</title>
</svelte:head>
<script>
  import Project from "../../components/Project.svelte";

  const project = [
    {
      "name": "Style transfer",
      "description": "Lalallala aldlasdhajsgda djsadgahdfa sdfag dsfd safdgsa fd gadgass fdga fdasgd safgds fagdas dghsaf dga dagf d",
      "ref": "https://github.com/kuko6/style-transfer"
    },
    {
      "name": "Click correction",
      "description": "Lalallala aldlasdhajsgda djsadgahdfa sdfag dsfd safdgsa fd gadgass fdga fdasgd safgds fagdas dghsaf dga dagf d",
      "ref": "https://github.com/kuko6/click-correction"
    }
  ]
</script>
<div class="space-y-6 dark:text-white">
  <h1 class="font-inter font-black text-2xl md:text-4xl">Projects</h1>
  <div class="flex flex-col gap-3">
    {#each project as p}
      <Project project={p} />
    {/each}
  </div>
</div>
