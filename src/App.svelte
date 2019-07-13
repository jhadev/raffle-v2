<script>
  import EntryForm from "./EntryForm.svelte";
  import Container from "./common/Container.svelte";
  import Jumbotron from "./common/Jumbotron.svelte";
  import Column from "./common/Column.svelte";
  import Row from "./common/Row.svelte";
  let raffle = [1, 3, 4];
  let name = "Josh";
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
    <h1>Hello {name}!</h1>
  </Jumbotron>
  <Row center>
    <Column mobile={12} md={6}>
      <EntryForm {raffle} {name} {entries} />
    </Column>
  </Row>
</Container>
