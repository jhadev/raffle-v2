<script>
  import Container from "./common/Container.svelte";
  import Jumbotron from "./common/Jumbotron.svelte";
  import Column from "./common/Column.svelte";
  import Row from "./common/Row.svelte";
  import Card from "./common/Card.svelte";
  import Input from "./common/Input.svelte";
  import Entry from "./Entry.svelte";
  import Display from "./Display.svelte";

  let raffle = [];
  let name = "";
  let entries = "";
  let winner = "";
  let winnerDisabled = false;
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

  const randomize = array => {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
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
  };

  const onSubmit = () => {
    const raffleClone = [...raffle];
    const newName = `${name},`;
    const repeatedName = newName.repeat(entries);
    const fullEntry = repeatedName.slice(0, -1).split(",");
    // returns an array of each name repeated like this ["josh", "josh", "josh"]

    // push each name into array
    fullEntry.forEach(entry => {
      raffleClone.push(entry);
    });
    // trigger a render
    raffle = randomize(raffleClone);
    // revert variables to initial state
    name = "";
    entries = "";
  };

  const deleteEntrant = event => {
    const { id } = event.target;
    raffle = raffle.filter(entrant => entrant !== id);
  };

  const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const pickWinner = () => {
    winnerDisabled = true;
    const raffleClone = [...raffle];
    const random = randomize(raffleClone);
    const winningIndex = random[getRandomInt(0, random.length - 1)];
    const interval = window.setInterval(() => {
      const tickerRandom = random[getRandomInt(0, random.length - 1)];
      winner = `<div class="badge badge-light">${tickerRandom}</div>`;
      window.setTimeout(() => {
        clearInterval(interval);
      }, 5000);
    }, 100);
    setTimeout(() => {
      winner = `<div class="badge badge-success">The winner is ${winningIndex}!</div>`;
      winnerDisabled = false;
    }, 5100);
  };
</script>

<style>
  /* i don't have much style yet */
  h1,
  h2 {
    text-align: center;
    color: aliceblue;
  }

  #winner {
    font-size: 48px;
  }
</style>

<Container>
  <Jumbotron textCenter>
    <h1>Raffle!</h1>
    {#if raffle.length}
      <h2>Total Entries: {raffle.length}</h2>
    {/if}
    {#if winner}
      <div id="winner" class="text-center">
        {@html winner}
      </div>
    {/if}
  </Jumbotron>
  <Row>
    <Column mobile={12} md={8}>
      <Display {count} on:click={deleteEntrant} />
    </Column>
    <Column mobile={12} md={4}>
      <Entry
        {name}
        {entries}
        {winnerDisabled}
        {pickWinner}
        {onSubmit}
        {raffle}
        handleNameInput={e => handleInput(e, 'name')}
        handleEntryInput={e => handleInput(e, 'entries')} />
    </Column>
  </Row>
</Container>
