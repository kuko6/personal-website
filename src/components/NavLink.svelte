<script>
  export let path;
  export let label;
</script>

<a
  class="flex flex-col justify-center px-2 hover:bg-indigo-100 dark:hover:bg-indigo-500 rounded-md"
  href={path}
>
  {label}
</a>
