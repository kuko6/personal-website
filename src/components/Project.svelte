<script>
  import Tech from "./Tech.svelte";
  export let project;
</script>

<a href={project.ref} target="_blank">
  <div class="border-2 rounded-md border-gray-300 p-2 hover:border-indigo-400">
    <h2 class="md:text-lg font-semibold">{project.name}</h2>
    <p class="text-sm md:text-base text-gray-500 dark:text-gray-300">
      {project.description}
    </p>
    <div class="my-3 border-t-2 border-gray-300"></div>
    <!-- <div class="flex gap-2 justify-center items-center"> -->
    <div class="flex gap-2">
      {#each project.used_tech as tech}
        <Tech name={tech} />
      {/each}
    </div>
  </div>
</a>
