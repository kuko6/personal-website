<script>
  export let project;
</script>

<a href={project.ref} target="_blank">
  <div class="border-2 rounded border-gray-300 p-2 hover:border-indigo-400">
    <h2 class="md:text-lg font-semibold">{project.name}</h2>
    <p class="text-sm md:text-base text-gray-500 dark:text-gray-300">{project.description}</p>
  </div>
</a>