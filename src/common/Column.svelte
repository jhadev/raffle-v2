<script>
  export let mobile;
  export let md;
  export let lg = "";
  export let xl = "";
</script>

<div class={`col-${mobile} col-md-${md} col-lg-${lg} col-xl-${xl}`}>
  <slot />
</div>
