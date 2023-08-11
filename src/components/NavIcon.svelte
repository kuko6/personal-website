<script>
  export let path;
  export let alt;
</script>

<a alt={alt} class="flex flex-col justify-center p-2 hover:bg-slate-200 dark:hover:bg-slate-600 dark:text-white rounded-md" href={path}>
  <slot />
</a>
