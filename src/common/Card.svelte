<script>
  export let color = "";
  export let header = "";
</script>

<style>
  /* i dont have style yet */
</style>

<div class={color ? `card ${color}` : 'card'}>
  {#if header}
    <div class="card-header">{header}</div>
  {/if}
  <div class="card-body">
    <slot />
  </div>
</div>
