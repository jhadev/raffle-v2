<script>
  import Row from "./common/Row.svelte";
  import Column from "./common/Column.svelte";
  import Card from "./common/Card.svelte";
  import Input from "./common/Input.svelte";
  // // code here
  export let raffle;
  export let name;
  export let entries;
  export let winnerDisabled;

  export let handleNameInput = (event, nameInput) => {};
  export let handleEntryInput = (event, nameInput) => {};
  export let pickWinner = () => {};
  export let onSubmit = () => {};
</script>

<style>
  .wrapper {
    text-align: center;
    color: black;
  }
</style>

<div class="wrapper">
  <Card color="bg-light" header="Input Your Entries">
    <Input
      id="nameInput"
      label="Name"
      className="input-text"
      placeholder="Enter Name"
      inputType="text"
      value={name}
      on:input={handleNameInput} />
    <Input
      id="entryInput"
      className="input-text"
      label="Entries"
      placeholder="Numbers only please"
      inputType="number"
      value={entries}
      on:input={handleEntryInput} />
    <button
      disabled={!name || !entries}
      on:click={onSubmit}
      class="btn btn-primary">
      Submit
    </button>
    <button
      disabled={raffle.length === 0 || winnerDisabled}
      on:click={pickWinner}
      class="btn btn-success">
      Pick Winner
    </button>
  </Card>
</div>
