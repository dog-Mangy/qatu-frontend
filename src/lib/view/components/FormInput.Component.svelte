<script>
  export let id;
  export let type = 'text';
  export let placeholder = '';
  export let value = '';
  export let required = false;
</script>

<div class="input-wrapper">
  {#if type === 'email'}
    <input {id} type="email" {placeholder} {required} bind:value />
  {:else if type === 'password'}
    <input {id} type="password" {placeholder} {required} bind:value />
  {:else if type === 'tel'}
    <input {id} type="tel" {placeholder} {required} bind:value />
  {:else}
    <input {id} type="text" {placeholder} {required} bind:value />
  {/if}
</div>

<style>
  .input-wrapper {
    display: flex;
    justify-content: center;
    width: 100%;
  }

  input {
    background: #11092a;
    font-size: 1.2rem;
    padding: 1rem;
    text-align: center;
    width: 90%;
  }

  input::placeholder {
    color: white;
  }

  @media screen and (max-width: 720px) {
    input {
      font-size: 1rem;
      padding: 0.75rem;
    }
  }

  @media screen and (max-width: 360px) {
    input {
      font-size: 0.9rem;
      padding: 0.5rem;
    }
  }
</style>
