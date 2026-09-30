<script lang="ts">
  import { page } from "$app/stores";
  export let path: string;
  export let label: string;
  $: active =
    $page.url.pathname === path ||
    (path !== "/" && $page.url.pathname.startsWith(`${path}/`));
</script>

<a
  class={`flex flex-col justify-center p-1 font-medium hover:bg-indigo-500 hover:text-white rounded ${active ? "underline underline-offset-4 decoration-3 decoration-indigo-400 hover:decoration-indigo-500" : ""}`}
  href={path}
  aria-current={active
    ? $page.url.pathname === path
      ? "page"
      : "true"
    : undefined}
>
  {label}
</a>
