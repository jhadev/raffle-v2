<script>
  export let count;
  export let animationNameIn;
  export let raffle;
  export let winnerDisabled;
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

  .deleteEntry {
    padding: 0.5rem 0.75rem !important;
  }
</style>

<!-- <div class="text-light text-center"> -->
<!-- iterate over count declaration -->
<!-- FIXME: change how this is displayed and maybe add a parent div? -->

{#if raffle.length}
  <h2 class="mb-4">Total Entries: {raffle.length}</h2>
{/if}

<div>
  {#each count as { name, total, odds }, index}
    {#if index === 0}
      <hr class="animated {animationNameIn} {name}" />
    {/if}
    <!-- FIXME: add back inbound animation but fix so border doesn't go blank -->
    <div
      class="count-wrapper {name} animated d-flex justify-content-between
      border-light border-right border-left">
      <!-- delete button -->
      <button
        disabled={winnerDisabled}
        value={name}
        id={name}
        on:click
        class="btn btn-outline-light deleteEntry">
        X
      </button>
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
    <hr class="{name} animated {animationNameIn}" />
  {:else}
    <h2>Add some entries!</h2>
  {/each}
  <!-- </div> -->
</div>
