<script>
  import EntryForm from "./EntryForm.svelte";
  import Container from "./common/Container.svelte";
  import Jumbotron from "./common/Jumbotron.svelte";
  import Column from "./common/Column.svelte";
  import Row from "./common/Row.svelte";
  let raffle = [1, 3, 4];
  let name = "";
  let entries = 0;
  let colSize = 6;
</script>

<style>
  /* i don't have much style yet */
  h1 {
    text-align: center;
    color: aliceblue;
  }
</style>

<Container>
  <Jumbotron textCenter>
    <h1>Raffle!</h1>
  </Jumbotron>
  <Row>
    <Column mobile={12} md={8}>
      <h1>Totals goes here</h1>
    </Column>
    <Column mobile={12} md={4}>
      <EntryForm {raffle} {name} {entries} />
    </Column>
  </Row>
</Container>
