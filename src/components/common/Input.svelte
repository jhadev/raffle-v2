<script>
  export let id;
  export let label;
  export let inputType;
  export let value;
  export let className = "";
  export let rows = 3;
  export let type = "input";
  export let placeholder = "";
</script>

<style>
  /* no style yet */
  label {
    font-size: 1rem !important;
    /* font-weight: bold; */
    text-align: left !important;
    margin-bottom: 5px !important;
  }

  .form-control {
    font-size: 1rem;
  }
</style>

<div class="form-group">
  <label for={id}>{label}</label>

  {#if type === 'textarea'}
    <textarea
      class={!className ? `form-control` : `form-control ${className}`}
      {rows}
      {id}
      {value}
      on:input />
  {:else}
    <input
      type={inputType}
      class={!className ? `form-control` : `form-control ${className}`}
      {id}
      {value}
      on:input
      aria-describedby={id}
      {placeholder} />
  {/if}
</div>
