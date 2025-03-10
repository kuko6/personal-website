<script>
  export let path;
  export let alt;
</script>

<a class="p-2 hover:bg-indigo-100 dark:hover:bg-indigo-500 dark:text-white rounded-md"
  alt={alt} 
  href={path}
  target="_blank"
>
  <slot />
</a>
