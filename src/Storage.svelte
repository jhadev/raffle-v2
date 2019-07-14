<script>
  export let raffle;
  export let raffleStorage;
  export let deleteRaffle = () => {};
  export let saveRaffle = () => {};
  export let loadRaffle = () => {};
</script>

<style>
  .storage {
    margin: 0rem 0.3rem;
    color: #fff;
  }
</style>

<!-- if raffle isn't empty -->
{#if raffle.length}
  <button class="storage btn btn-outline-success" on:click={saveRaffle}>
    Save Raffle
  </button>
{/if}
<!-- if something is in localStorage -->
{#if raffleStorage}
  <button class="storage btn btn-outline-primary" on:click={loadRaffle}>
    Load Raffle
  </button>
  <button class="storage btn btn-outline-danger" on:click={deleteRaffle}>
    Delete Raffle
  </button>
{/if}
