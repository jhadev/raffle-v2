<script>
  // code here
  export let raffle;
  export let name;
  export let entries;
</script>

<style>
  /* scoped style here */
  .wrapper {
    text-align: center;
    color: aliceblue;
  }
</style>

<!-- svelte html here -->

<div class="wrapper">
  <h1>{raffle}</h1>
  <h1>{name}</h1>
  <h1>{entries}</h1>
</div>
