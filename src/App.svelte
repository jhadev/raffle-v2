<script>
  import moment from "moment";
  import Container from "./common/Container.svelte";
  import Jumbotron from "./common/Jumbotron.svelte";
  import Column from "./common/Column.svelte";
  import Row from "./common/Row.svelte";
  import Card from "./common/Card.svelte";
  import Input from "./common/Input.svelte";
  import Entry from "./Entry.svelte";
  import Display from "./Display.svelte";
  import Storage from "./Storage.svelte";

  let raffle = [];
  let name = "";
  let entries = "";
  let winner = "";
  let winnerDisabled = false;
  let raffleStorage = localStorage.getItem("raffle");
  console.log(raffleStorage);
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
    // turn winner into empty string just in case
    winner = "";
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

  // TODO: add a way to check if localstorage is empty so the load button can be disabled
  const saveRaffle = () => {
    const raffleClone = [...raffle];
    if (raffleClone.length > 0) {
      localStorage.setItem("raffle", JSON.stringify(raffleClone));
      // trigger a render to remove load button
      raffleStorage = localStorage.getItem("raffle");
      const date = moment().format("LLL");
      localStorage.setItem("date", JSON.stringify(date));
      // TODO: get rid of alerts
      alert(`raffle saved on ${date}`);
    } else {
      alert("raffle is empty");
    }
  };

  const loadRaffle = () => {
    console.log("clicked");
    const raffleClone = [...raffle];
    const savedRaffle = localStorage.getItem("raffle");
    let savedDate = localStorage.getItem("date");
    savedDate = JSON.parse(savedDate);
    // this will add to raffle whether it is empty or not
    if (savedRaffle) {
      const namesList = JSON.parse(savedRaffle);
      namesList.forEach(name => {
        raffleClone.push(name);
      });
      raffle = raffleClone;
    }
  };

  const deleteRaffle = () => {
    console.log("clicked");
    localStorage.clear();
    // trigger a render to remove load button
    raffleStorage = localStorage.getItem("raffle");
  };
</script>

<style>
  /* i don't have much style yet */
  h1,
  h2 {
    text-align: center;
    color: aliceblue;
    margin-top: 10px;
  }

  #winner {
    font-size: 48px;
  }
</style>

<Container>
  <Jumbotron textCenter>
    <h1>Raffle!</h1>
    <Storage
      {raffle}
      {raffleStorage}
      {loadRaffle}
      {saveRaffle}
      {deleteRaffle} />

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
