<script>
  export let mobile;
  export let md;
  // these props are optional export initial values as falsy
  export let lg = "";
  export let xl = "";
</script>

{#if lg && xl}
  <div class={`col-${mobile} col-md-${md} col-lg-${lg} col-xl-${xl}`}>
    <slot />
  </div>
{:else if lg}
  <div class={`col-${mobile} col-md-${md} col-lg-${lg}`}>
    <slot />
  </div>
{:else if xl}
  <div class={`col-${mobile} col-md-${md} col-xl-${xl}`}>
    <slot />
  </div>
{:else}
  <div class={`col-${mobile} col-md-${md}`}>
    <slot />
  </div>
{/if}
