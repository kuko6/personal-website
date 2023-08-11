<script>
  export let path;
  export let label;
</script>

<a class="flex flex-col justify-center px-2 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-md" 
  href={path}
>
  {label}
</a>
