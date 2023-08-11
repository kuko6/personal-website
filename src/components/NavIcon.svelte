<script>
  export let path;
  export let alt;
</script>

<a class="p-2 hover:bg-slate-200 dark:hover:bg-slate-600 dark:text-white rounded-md"
  alt={alt} 
  href={path}
>
  <slot />
</a>
