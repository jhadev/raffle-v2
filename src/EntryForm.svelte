<script>
  import Row from "./common/Row.svelte";
  import Column from "./common/Column.svelte";
  import Card from "./common/Card.svelte";
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
  <Card color="bg-dark" header="testing">
    <h1>{raffle}</h1>
    <h1>{name}</h1>
    <h1>{entries}</h1>
  </Card>
</div>
