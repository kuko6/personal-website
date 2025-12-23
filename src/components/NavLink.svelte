<script>
  import { page } from "$app/stores";
  export let path;
  export let label;
</script>

<a
  class={`flex flex-col justify-center p-1 font-medium hover:bg-indigo-500 hover:text-white rounded ${$page.url.pathname == path ? "underline underline-offset-4 decoration-2 decoration-indigo-500 py-1" : ""}`}
  href={path}
>
  {label}
</a>
