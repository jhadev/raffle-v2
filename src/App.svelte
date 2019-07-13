<script>
  import EntryForm from "./EntryForm.svelte";
  import Container from "./common/Container.svelte";
  import Jumbotron from "./common/Jumbotron.svelte";
  import Row from "./common/Row.svelte";
  let raffle = [1, 3, 4];
  let name = "Josh";
  let entries = 0;
</script>

<style>
  /* i don't have much style yet */
</style>

<Container>
  <Jumbotron textCenter>
    <h1>Hello {name}!</h1>
    <EntryForm {raffle} {name} {entries} />
  </Jumbotron>
  <Row center>
    <h1>Test</h1>
  </Row>
</Container>
