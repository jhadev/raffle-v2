<script>
  // these props are optional export initial values as falsy
  export let textCenter = false;
  export let fluid = false;
</script>

<style>
  /* i don't have much style yet */
  .jumbotron {
    margin-bottom: 0px !important;
    padding: 2rem 2rem !important;
  }

  @media screen and (max-width: 600px) {
    .jumbotron {
      padding: 1rem 1rem !important;
    }
  }
</style>

<div
  class="jumbotron"
  class:text-center={textCenter}
  class:jumbotron-fluid={fluid}>
  <slot />
</div>
