<script>
  import moment from "moment";
  import swal from "sweetalert";
  import { colorClasses, phrases } from "./constants/constant";
  import Container from "./components/common/Container.svelte";
  import Jumbotron from "./components/common/Jumbotron.svelte";
  import Column from "./components/common/Column.svelte";
  import Row from "./components/common/Row.svelte";
  import Entry from "./components/Entry.svelte";
  import Display from "./components/Display.svelte";
  import Storage from "./components/Storage.svelte";

  // TODO: get rid of console.logs and alerts

  let raffle = [];
  let name = "";
  let entries = "";
  let winner = "";
  let winnerDisabled = false;
  let raffleStorage = !!localStorage.getItem("raffle");
  let progressBar = 0;
  let progressText = "";
  let animationNameIn = "zoomIn";
  let animationNameOut = "zoomOut";

  // reactive declaration to count names in raffle array whenever it changes
  // possibly can add to this to do more.
  $: count = countEntrants(raffle);

  // START REACTIVE FUNCTIONS
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
  // END REACTIVE FUNCTIONS

  // START UTILITY FUNCTIONS
  const animateProgressBar = () => {
    let currentProgress = 0;
    progressBar = 0;
    progressText = "Randomizing Entries";
    const interval = setInterval(function() {
      currentProgress += getRandomInt(50, 75);
      progressBar = currentProgress;
      if (currentProgress >= 100) {
        clearInterval(interval);
        progressText = "Entries Randomized";
      }
    }, 1000);
  };

  const scrollTop = () => {
    if (screen.width <= 768) {
      window.scrollTo(0, 0);
    }
  };

  const randomize = array => {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // END UTILITY FUNCTIONS

  // START RAFFLE FUNCTIONS
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
    // TODO: display message to user
    // if entries are 0 clear field
    if (!parseInt(entries)) {
      entries = "";
      return;
    }

    animateProgressBar();
    // turn winner into empty string just in case
    winner = "";
    const raffleClone = [...raffle];
    const newName = `${name},`;
    const repeatedName = newName.repeat(parseInt(entries));
    // returns an array of each name repeated like this ["josh", "josh", "josh"]
    const fullEntry = repeatedName.slice(0, -1).split(",");
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

  const resetRaffle = () => {
    progressBar = 0;
    progressText = "";
    winner = "";
    raffle = [];
  };

  const deleteEntrant = event => {
    winner = "";
    progressBar = 0;
    progressText = "";
    // grab value from delete button
    const { value, id } = event.target;
    document.getElementById(id).blur();
    // grab node list where the value === className and turn it into an array
    let namesDOM = [...document.getElementsByClassName(value)];
    // loop and remove the inbound animation and add the outbound
    namesDOM.forEach(name => {
      name.classList.remove(animationNameIn);
      name.classList.add(animationNameOut);
    });
    // wait half a second to trigger a render and remove entrant from raffle array.
    setTimeout(() => {
      raffle = raffle.filter(entrant => entrant !== value);
    }, 700);
  };

  const pickWinner = () => {
    scrollTop();
    animateProgressBar();
    winnerDisabled = true;
    const raffleClone = [...raffle];
    const random = randomize(raffleClone);
    const winningName = random[getRandomInt(0, random.length - 1)];
    const interval = setInterval(() => {
      const randomClass =
        colorClasses[getRandomInt(0, colorClasses.length - 1)];
      const randomPhrase = phrases[getRandomInt(0, phrases.length - 1)];
      const tickerRandom = random[getRandomInt(0, random.length - 1)];
      // FIXME: change how this is displayed
      winner = `<span class='text-light mr-3 phrase'>${randomPhrase}</span><div class="animated pulse random badge badge-${randomClass}">${tickerRandom}</div>`;
      setTimeout(() => {
        clearInterval(interval);
      }, 5000);
    }, 300);
    setTimeout(() => {
      // FIXME: change how this is displayed
      winner = `<div class="animated flip win badge badge-success">The winner is ${winningName}!</div>`;
      winnerDisabled = false;
    }, 5300);
  };
  // END RAFFLE FUNCTIONS

  // START STORAGE FUNCTIONS
  const saveRaffle = () => {
    // FIXME: clean this up somehow??
    const raffleClone = [...raffle];

    if (raffleClone.length > 0 && raffleStorage) {
      const savedDate = JSON.parse(localStorage.getItem("date"));
      swal({
        title: "Hold up...",
        text: `You are about to overwrite your current save from ${savedDate}. Do you want to proceed?`,
        icon: "warning",
        buttons: {
          cancel: "Cancel",
          confirm: {
            text: "Do It!",
            value: true,
            className: "save"
          }
        }
      }).then(value => {
        if (value) {
          localStorage.setItem("raffle", JSON.stringify(raffleClone));
          // trigger a render to remove load button
          // set raffleStorage to its boolean value
          raffleStorage = !!localStorage.getItem("raffle");
          console.log(raffleStorage);
          const date = moment().format("LLL");
          localStorage.setItem("date", JSON.stringify(date));
        }
      });
    } else if (raffleClone.length > 0) {
      localStorage.setItem("raffle", JSON.stringify(raffleClone));
      // trigger a render to remove load button
      // set raffleStorage to its boolean value
      raffleStorage = !!localStorage.getItem("raffle");
      console.log(raffleStorage);
      const date = moment().format("LLL");
      localStorage.setItem("date", JSON.stringify(date));

      swal({
        title: "Raffle Saved!",
        text: `Your raffle has been saved on ${date}`,
        icon: "success",
        button: "Close"
      });
    }
  };

  const loadRaffle = () => {
    const raffleClone = [...raffle];
    const savedRaffle = localStorage.getItem("raffle");
    let savedDate = localStorage.getItem("date");
    savedDate = JSON.parse(savedDate);
    const namesList = JSON.parse(savedRaffle);

    if (savedRaffle && raffle.length) {
      namesList.forEach(name => {
        raffleClone.push(name);
      });
      swal({
        title: "Loading Raffle...",
        text: `Loading your saved raffle from ${savedDate} will merge it with the current raffle.`,
        icon: "warning",
        buttons: {
          cancel: "Cancel",
          confirm: {
            text: "Load",
            value: true,
            className: "load"
          }
        }
      }).then(value => {
        if (value) {
          raffle = raffleClone;
        }
      });
    } else if (savedRaffle) {
      raffle = namesList;
      swal({
        title: "Success!",
        text: `Your raffle from ${savedDate} has been loaded`,
        icon: "success",
        button: {
          text: "Close",
          className: "load"
        }
      });
    }
  };

  const deleteRaffle = () => {
    let savedDate = localStorage.getItem("date");
    savedDate = JSON.parse(savedDate);
    swal({
      title: "Deleting Raffle...",
      text: `Delete your raffle that was saved on ${savedDate}?`,
      icon: "error",
      buttons: {
        cancel: "Cancel",
        confirm: {
          text: "Delete",
          value: true,
          className: "delete"
        }
      }
    }).then(value => {
      if (value) {
        // trigger a render to remove load button
        // set raffleStorage to its boolean value
        localStorage.clear();
        raffleStorage = !!localStorage.getItem("raffle");
      }
    });
  };
  // END STORAGE FUNCTIONS
</script>

<style>
  /* TODO: don't forget to style */
  h1 {
    text-align: center;
    color: #fff;
    margin: 1.5rem 0px;
    font-size: 48px;
  }

  #winner {
    font-size: 3rem;
    text-align: center;
    margin-top: 0.5rem !important;
    margin-bottom: 0.5rem !important;
  }

  @media screen and (max-width: 400px) {
    #winner {
      font-size: 2rem;
    }
  }
</style>

<div class="mb-2">
  <Container>
    <Jumbotron textCenter>
      <h1 class="title">Raffle!</h1>
      <Storage
        {raffle}
        {raffleStorage}
        {loadRaffle}
        {saveRaffle}
        {deleteRaffle} />
      {#if winner}
        <div id="winner">
          {@html winner}
        </div>
      {/if}
    </Jumbotron>
    <Row>
      <Column mobile={12} md={8}>
        <Row center>
          <Column mobile={12} md={10}>
            <Display
              {raffle}
              {animationNameIn}
              {count}
              {winnerDisabled}
              on:click={deleteEntrant} />

          </Column>
        </Row>
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
          {progressBar}
          {progressText}
          handleNameInput={e => handleInput(e, 'name')}
          handleEntryInput={e => handleInput(e, 'entries')} />
      </Column>
    </Row>
  </Container>
</div>
