<svelte:head>
  <title>Projects - Kuko</title>
</svelte:head>
<script>
  import Project from "../../components/Project.svelte";

  const project = [
    {
      "name": "Style transfer",
      "description": "Pytorch implementation of style transfer based on the Adaptive Instance Normalization.",
      "ref": "https://github.com/kuko6/style-transfer"
    },
    {
      "name": "Click correction",
      "description": `Method for Segmentation of Vestibular Schwannomas from Brain MRI Scans. The method 
      utilises an auxilarly correction network, which based on user-defined clicks refines the initial segmentation.`,
      "ref": "https://github.com/kuko6/click-correction"
    },
    {
      "name": "Various computer vision assignments",
      "description": "Computer Vision assignments from university course (in slovak).",
      "ref": "https://github.com/kuko6/cv-assignments"
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
