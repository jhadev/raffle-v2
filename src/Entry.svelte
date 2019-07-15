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
  export let progressBar = 0;
  export let progressText;

  export let handleNameInput = (event, nameInput) => {};
  export let handleEntryInput = (event, nameInput) => {};
  export let pickWinner = () => {};
  export let onSubmit = () => {};
  export let resetRaffle = () => {};
</script>

<style>
  .wrapper {
    text-align: center;
    color: black;
  }

  .resetRaffle {
    font-size: 14px;
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
    <Row center>
      <Column mobile={12} md={12}>
        <div class="progress mb-3">
          <div
            style="width: {progressBar}%"
            id="dynamic"
            class="progress-bar progress-bar-striped bg-dark"
            class:progress-bar-animated={progressBar <= 100}
            role="progressbar"
            aria-valuenow={progressBar}
            aria-valuemin="0"
            aria-valuemax="100">
            <span id="current-progress">{progressText}</span>
          </div>
        </div>
      </Column>
    </Row>
    <Row>
      <button
        disabled={!name || !entries}
        on:click={onSubmit}
        class="btn btn-primary ml-3 mb-2">
        Submit
      </button>
    </Row>
    <Row>
      <button
        disabled={raffle.length === 0 || winnerDisabled}
        on:click={pickWinner}
        class="ml-3 btn btn-success">
        Pick Winner
      </button>
      {#if raffle.length}
        <button
          on:click={resetRaffle}
          class="mr-3 ml-auto btn btn-outline-danger">
          <i class="fas fa-undo-alt resetRaffle" />
        </button>
      {/if}
    </Row>
  </Card>
</div>
