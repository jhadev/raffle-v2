<script>
  export let count;
  export let animationNameIn;
</script>

<style>
  /* TODO: fix styles */
  .odds {
    font-size: 1.2rem;
  }

  .count-wrapper {
    padding: 1rem 1.5rem;
    /* margin: 0rem 1rem 1rem 1rem; */
  }

  hr {
    border-color: #f8f9fa !important;
    margin: 0px !important;
  }

  h2 {
    text-align: center;
    color: #f8f9fa;
  }
</style>

<!-- <div class="text-light text-center"> -->
<!-- iterate over count declaration -->
<!-- FIXME: change how this is displayed -->

{#each count as { name, total, odds }, index}
  {#if index === 0}
    <hr class="animated {animationNameIn} {name}" />
  {/if}
  <div
    class="count-wrapper {name} animated {animationNameIn} d-flex
    justify-content-between border-light border-right border-left">

    <!-- delete button -->
    <button value={name} on:click class="btn btn-outline-light">X</button>
    <!-- display content -->
    <div class="align-self-center badge badge-light odds">{name}: {total}</div>
    {#if odds > 50}
      <div class="align-self-center odds badge badge-success">{odds}%</div>
    {:else if odds < 10}
      <div class="align-self-center odds badge badge-danger">{odds}%</div>
    {:else}
      <div class="align-self-center odds badge badge-light">{odds}%</div>
    {/if}
  </div>
  <hr class="{name} animated {animationNameIn}" />
{:else}
  <h2>Counts go here</h2>
{/each}
<!-- </div> -->
