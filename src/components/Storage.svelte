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

  .wrapper {
    margin-bottom: 1rem;
  }

  @media screen and (max-width: 600px) {
    button {
      margin: 3px 3px !important;
      padding: 0.3rem 0.6rem;
      font-size: 0.75rem;
      line-height: 1.5;
      border-radius: 0.2rem;
    }
  }
</style>

<div class="wrapper">
  <!-- if raffle isn't empty -->
  {#if raffle.length}
    <button
      class="storage animated slideInLeft btn btn-outline-success"
      on:click={saveRaffle}>
      Save Raffle
    </button>
  {/if}
  <!-- if something is in localStorage -->
  {#if raffleStorage && raffle.length}
    <button
      class="storage animated zoomIn btn btn-outline-primary"
      on:click={loadRaffle}>
      Load Raffle
    </button>
    <button
      class="storage animated slideInRight btn btn-outline-danger"
      on:click={deleteRaffle}>
      Delete Raffle
    </button>
  {:else if raffleStorage}
    <button
      class="storage animated slideInLeft btn btn-outline-primary"
      on:click={loadRaffle}>
      Load Raffle
    </button>
    <button
      class="storage animated slideInRight btn btn-outline-danger"
      on:click={deleteRaffle}>
      Delete Raffle
    </button>
  {/if}
</div>
