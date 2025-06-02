<script>
  import { onMount } from 'svelte';
  import {
    getAllStores,
    createStore,
  } from '../../viewmodel/viewmodels/storeViewModel.js';

  let stores = [];
  let error = '';
  let showForm = false;

  let Name = '';
  let Description = '';
  let UserId = '';

  onMount(async () => {
    await loadStores();
  });

  async function loadStores() {
    try {
      stores = await getAllStores();
    } catch (err) {
      error = err.message;
    }
  }

  async function handleSubmit() {
    try {
      const newStore = await createStore({ UserId, Name, Description });
      stores = [...stores, newStore];
      showForm = false;
      Name = '';
      Description = '';
      UserId = '';
    } catch (err) {
      error = err.message;
    }
  }
</script>

{#if error}
  <p class="error">Error: {error}</p>
{:else}
  <div class="stores-container">
    <h2>Registered Stores</h2>

    <button
      type="button"
      class="add-store-container"
      on:click={() => (showForm = !showForm)}
    >
      <span class="add-icon">➕</span>
      <span class="add-text">Add Store</span>
    </button>

    {#if showForm}
      <form class="store-form" on:submit|preventDefault={handleSubmit}>
        <input type="text" placeholder="User ID" bind:value={UserId} required />
        <input
          type="text"
          placeholder="Store Name"
          bind:value={Name}
          required
        />
        <textarea placeholder="Description" bind:value={Description} required
        ></textarea>
        <button type="submit">Create Store</button>
      </form>
    {/if}

    <div class="cards">
      {#each stores as store}
        <div class="card">
          <h3>{store.name}</h3>
          <p><strong>User ID:</strong> {store.userId}</p>
          <p><strong>Description:</strong> {store.description}</p>
        </div>
      {/each}
    </div>
  </div>
{/if}

<style>
  .stores-container {
    max-width: 1200px;
    width: 100%;
    margin: 40px auto;
    padding: 20px;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
    color: black;
    position: relative;
  }

  h2 {
    text-align: center;
    margin-bottom: 20px;
  }

  input,
  textarea {
    padding: 15px;
    border-radius: 4px;
    border: 1px solid #888;
    font-size: 1rem;
    background-color: white;
    color: black;
  }

  .cards {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .card {
    background-color: #f0f0ff;
    border: 1px solid #ccc;
    border-radius: 10px;
    padding: 15px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .card h3 {
    margin-top: 0;
    color: #3f028f;
  }

  .store-form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 30px;
    background: #fafafa;
    padding: 15px;
    border-radius: 10px;
    border: 1px solid #ccc;
  }

  .store-form input,
  .store-form textarea {
    padding: 10px;
    border: 1px solid #999;
    border-radius: 5px;
  }

  .store-form button {
    align-self: flex-end;
    padding: 10px 20px;
    background-color: #3f028f;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  .add-store-container {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    margin-bottom: 20px;
    background-color: #3f028f;
    color: white;
    padding: 6px 12px;
    border-radius: 8px;
    font-size: 14px;
    width: fit-content;
    transition: background-color 0.3s;
  }

  .add-store-container:hover {
    background-color: #290260;
  }

  .add-icon {
    font-size: 16px;
  }

  .add-text {
    font-size: 14px;
  }

  .error {
    color: red;
    text-align: center;
  }
</style>
