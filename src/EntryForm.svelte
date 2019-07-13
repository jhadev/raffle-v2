<script>
  import Row from "./common/Row.svelte";
  import Column from "./common/Column.svelte";
  import Card from "./common/Card.svelte";
  // code here
  export let raffle;
  export let name;
  export let entries;

  const handleNameInput = event => {
    const { value } = event.target;
    name = value;
  };

  const handleEntryInput = event => {
    const { value } = event.target;
    entries = value;
  };
</script>

<style>
  /* scoped style here */
  .wrapper {
    text-align: center;
    color: black;
  }
</style>

<!-- svelte html here -->

<div class="wrapper">
  <Card color="bg-light" header="testing">
    <h1>{raffle}</h1>
    <h1>{name}</h1>
    <h1>{entries}</h1>
    <form>
      <div class="form-group">
        <label for="nameInput">Name</label>
        <input
          type="text"
          class="form-control input-text"
          id="entrant-name"
          value={name}
          on:input={handleNameInput}
          aria-describedby="nameInput"
          placeholder="Enter name" />
      </div>
      <div class="form-group">
        <label for="entriesInput">Number of entries</label>
        <input
          type="number"
          class="form-control input-text"
          id="entries"
          value={entries}
          on:input={handleEntryInput}
          placeholder="Numbers only please" />
      </div>
    </form>
  </Card>
</div>
