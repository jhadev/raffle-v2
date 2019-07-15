<script>
  import moment from "moment";
  import Container from "./common/Container.svelte";
  import Jumbotron from "./common/Jumbotron.svelte";
  import Column from "./common/Column.svelte";
  import Row from "./common/Row.svelte";

  import Entry from "./Entry.svelte";
  import Display from "./Display.svelte";
  import Storage from "./Storage.svelte";

  // TODO: get rid of console.logs and alerts

  let raffle = [];
  let name = "";
  let entries = "";
  let winner = "";
  let winnerDisabled = false;
  let raffleStorage = !!localStorage.getItem("raffle");
  let animatedClass = `slideInLeft`;
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
    // sort by highest odds
    raffleCount = raffleCount.sort((a, b) =>
      parseInt(a.odds) < parseInt(b.odds) ? 1 : -1
    );

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
      // FIXME: change how this is displayed
      winner = `<div class="badge badge-light">${tickerRandom}</div>`;
      window.setTimeout(() => {
        clearInterval(interval);
      }, 5000);
    }, 100);
    setTimeout(() => {
      // FIXME: change how this is displayed
      winner = `<div class="badge badge-success">The winner is ${winningIndex}!</div>`;
      winnerDisabled = false;
    }, 5100);
  };

  const saveRaffle = () => {
    const raffleClone = [...raffle];
    if (raffleClone.length > 0) {
      localStorage.setItem("raffle", JSON.stringify(raffleClone));
      // trigger a render to remove load button
      // set raffleStorage to its boolean value
      raffleStorage = !!localStorage.getItem("raffle");
      console.log(raffleStorage);
      const date = moment().format("LLL");
      localStorage.setItem("date", JSON.stringify(date));
      // TODO: get rid of alerts but still let user know what is happening (swal or modal?)
      alert(`raffle saved on ${date}`);
    } else {
      alert("raffle is empty");
    }
  };

  const loadRaffle = () => {
    const raffleClone = [...raffle];
    const savedRaffle = localStorage.getItem("raffle");
    let savedDate = localStorage.getItem("date");
    savedDate = JSON.parse(savedDate);
    // FIXME: this will add to raffle whether it is empty or not so let user know.
    if (savedRaffle) {
      const namesList = JSON.parse(savedRaffle);
      namesList.forEach(name => {
        raffleClone.push(name);
      });
      raffle = raffleClone;
    }
  };

  const deleteRaffle = () => {
    // FIXME: let the user know what is happening.
    localStorage.clear();
    // trigger a render to remove load button
    // set raffleStorage to its boolean value
    raffleStorage = !!localStorage.getItem("raffle");
  };

  const resetRaffle = () => {
    raffle = [];
  };
</script>

<style>
  /* TODO: don't forget to style */
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
        {resetRaffle}
        handleNameInput={e => handleInput(e, 'name')}
        handleEntryInput={e => handleInput(e, 'entries')} />
    </Column>
  </Row>
</Container>
