<script>
  // these props are optional export initial values as falsy
  export let textCenter = false;
  export let fluid = false;
</script>

<style>
  /* i don't have much style yet */
</style>

<div
  class="jumbotron"
  class:text-center={textCenter}
  class:jumbotron-fluid={fluid}>
  <slot />
</div>
