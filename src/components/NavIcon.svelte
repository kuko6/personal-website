<script>
  export let icon;
  export let path;
  export let alt;
</script>

<a class="flex flex-col justify-center p-1 hover:bg-slate-100 rounded-md" href={path}>
  <img alt={alt} src={icon} width="18" height="18">
</a>