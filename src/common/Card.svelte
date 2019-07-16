<script>
  // these props are optional export initial values as falsy
  export let color = "";
  export let header = "";
</script>

<style>
  /* i dont have style yet */
  .header {
    font-weight: bold;
    font-size: 0.95rem;
  }
</style>

<div class={color ? `card ${color}` : 'card'}>
  {#if header}
    <div class="card-header header">{header}</div>
  {/if}
  <div class="card-body">
    <slot />
  </div>
</div>
