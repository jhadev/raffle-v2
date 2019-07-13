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

  // reactive declaration to count names in raffle array whenever it changes
  // possibly can add to this to do more.
  $: count = countEntrants(raffle);

  const countEntrants = raffle => {
    let raffleCount = raffle.reduce((obj, name) => {
      obj[name] = (obj[name] || 0) + 1;
      return obj;
    }, {});
    // turn into array of arrays with name and count
    raffleCount = Object.entries(raffleCount);
    // map into objects with name, total, odds key:value pairs
    raffleCount = raffleCount.map(([name, total]) => ({
      name,
      total,
      odds: ((total / raffle.length) * 100).toFixed(2)
    }));
    console.log(raffleCount);
    return raffleCount;
  };

  const handleInput = (event, inputName) => {
    const { value } = event.target;
    switch (inputName) {
      case "name":
        name = value;
        break;
      case "entries":
        entries = value;
        break;
    }
    console.log(name, entries);
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

  const deleteEntrant = event => {
    const { id } = event.target;
    raffle = raffle.filter(entrant => entrant !== id);
  };

  console.log(raffle, name, entries);
  // console.log(count);
</script>

<style>
  /* i don't have much style yet */
  h1,
  h2 {
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
    <h2>Total Entries: {raffle.length}</h2>
  </Jumbotron>
  <Row>
    <Column mobile={12} md={8}>
      <!-- Test reactive declaration -->
      <div class="text-light text-center">
        <!-- possibly extract this to separate component -->
        <!-- iterate over count declaration -->
        {#each count as { name, total, odds }, index}
          <div>{name}</div>
          <div>{total}</div>
          <div>{odds}</div>
          <button
            id={name}
            on:click={deleteEntrant}
            class="btn btn-outline-light">
            X
          </button>
        {:else}
          <p>Counts go here</p>
        {/each}
      </div>
    </Column>
    <Column mobile={12} md={4}>
      <div class="wrapper">
        <Card color="bg-light" header="Input Your Entries">
          <Input
            id="nameInput"
            label="Name"
            className="input-text"
            placeholder="Enter Name"
            inputType="text"
            value={name}
            on:input={e => handleInput(e, 'name')} />
          <Input
            id="entryInput"
            className="input-text"
            label="Entries"
            placeholder="Numbers only please"
            inputType="number"
            value={entries}
            on:input={e => handleInput(e, 'entries')} />
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
