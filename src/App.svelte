<script>
  // import EntryForm from "./EntryForm.svelte";
  import Container from "./common/Container.svelte";
  import Jumbotron from "./common/Jumbotron.svelte";
  import Column from "./common/Column.svelte";
  import Row from "./common/Row.svelte";
  import Card from "./common/Card.svelte";
  import Input from "./common/Input.svelte";
  let raffle = [];
  let name = "";
  let entries = "";

  const handleNameInput = event => {
    const { value } = event.target;
    name = value;
  };

  const handleEntryInput = event => {
    const { value } = event.target;
    entries = value;
  };

  const onSubmit = () => {
    const raffleClone = [...raffle];
    console.log("clicked");
    const newName = `${name},`;
    const repeatedName = newName.repeat(entries);
    const fullEntry = repeatedName.slice(0, -1).split(",");
    // returns an array of each name repeated like this ["josh", "josh", "josh"]

    // push each name into array
    fullEntry.forEach(entry => {
      raffleClone.push(entry);
    });

    // trigger a render
    raffle = raffleClone;
    console.log(raffle, name, entries);
    // revert variables to initial state
    name = "";
    entries = "";
  };

  console.log(raffle, name, entries);
</script>

<style>
  /* i don't have much style yet */
  h1 {
    text-align: center;
    color: aliceblue;
  }

  .wrapper {
    text-align: center;
    color: black;
  }
</style>

<Container>
  <Jumbotron textCenter>
    <h1>Raffle!</h1>
    <!-- test re render -->
    {#if raffle.length > 10 && raffle.length}
      <h1>Hi!</h1>
    {/if}
  </Jumbotron>
  <Row>
    <Column mobile={12} md={8}>
      <h1>Totals goes here</h1>
    </Column>
    <Column mobile={12} md={4}>
      <div class="wrapper">
        <Card color="bg-light" header="testing">
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
        </Card>
      </div>
    </Column>
  </Row>
</Container>
