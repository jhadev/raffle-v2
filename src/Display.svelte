<script>
  export let count;
</script>

<style>
  /* TODO: fix styles */
  .odds {
    font-size: 1.2rem;
  }

  .count-wrapper {
    padding: 1rem 1.5rem;
    margin: 0rem 1rem 1rem 1rem;
  }
</style>

<div class="text-light text-center">
  <!-- iterate over count declaration -->
  <!-- FIXME: change how this is displayed -->
  {#each count as { name, total, odds }}
    <div
      class="count-wrapper d-flex justify-content-between border border-light">
      <!-- delete button -->
      <button id={name} on:click class="btn btn-outline-light">X</button>
      <!-- display content -->
      <div class="align-self-center badge badge-light odds">
        {name}: {total}
      </div>
      {#if odds > 50}
        <div class="align-self-center odds badge badge-success">{odds}%</div>
      {:else if odds < 10}
        <div class="align-self-center odds badge badge-danger">{odds}%</div>
      {:else}
        <div class="align-self-center odds badge badge-light">{odds}%</div>
      {/if}
    </div>
  {:else}
    <h2>Counts go here</h2>
  {/each}
</div>
