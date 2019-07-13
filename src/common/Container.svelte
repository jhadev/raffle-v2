<script>
  export let fluid = false;
</script>

<div class={fluid ? 'container-fluid' : 'container'}>
  <slot />
</div>
