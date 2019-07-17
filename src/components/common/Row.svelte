<script>
  // these props are optional export initial values as falsy
  export let between = false;
  export let start = false;
  export let end = false;
  export let around = false;
  export let center = false;
</script>

<div
  class="row"
  class:justify-content-between={between}
  class:justify-content-start={start}
  class:justify-content-end={end}
  class:justify-content-around={around}
  class:justify-content-center={center}>
  <slot />
</div>
