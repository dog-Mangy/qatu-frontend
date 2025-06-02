<script>
  export let stores = [];

  function navigateToStore(storeId) {
    window.location.href = `/#/store/${storeId}`;
  }
</script>

<div class="stores-container">
  {#if stores.length === 0}
    <div class="no-stores">No stores found</div>
  {:else}
    <div class="title-container">
      <h2 class="section-title">Stores</h2>
    </div>

    <div class="stores-grid">
      {#each stores as store (store.id)}
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <div class="store-card" on:click={() => navigateToStore(store.id)}>
          <div class="store-info">
            <h3 class="store-name">{store.name}</h3>
            <p class="store-created">Created: {new Date(store.createdAt).toLocaleDateString()}</p>
            <p class="store-description">{store.description}</p>
          </div>
        </div>
      {/each}
    </div>
  {/if}
</div>

<style>
  .no-stores {
    text-align: center;
    padding: 2rem;
    font-size: 1.2rem;
    color: #666;
  }
  .stores-container {
    padding: 2rem 1rem;
    max-width: 1200px;
    margin: 0 auto;
  }

  .title-container {
    margin-bottom: 2rem;
  }

  .section-title {
    text-align: center;
    font-size: 2rem;
    color: #333;
    margin: 0;
  }

  .stores-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    justify-items: center;
  }

  .store-card {
    background: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition:
      transform 0.3s ease,
      box-shadow 0.3s ease;
    width: 100%;
    max-width: 350px;
    cursor: pointer;
    padding: 1.5rem;
    box-sizing: border-box;
  }

  .store-info {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: 100%;
  }

  .store-name {
    margin: 0;
    font-size: 1.25rem;
    color: #222;
    word-wrap: break-word;
    overflow-wrap: break-word;
    hyphens: auto;
  }

  .store-created {
    margin: 0;
    color: #555;
    font-size: 0.9rem;
    font-style: italic;
  }

  .store-description {
    margin: 0.5rem 0 0 0;
    color: #666;
    font-size: 0.9rem;
    line-height: 1.4;
    word-wrap: break-word;
    overflow-wrap: break-word;
    hyphens: auto;
    display: -webkit-box;
    -webkit-line-clamp: 10;
    line-clamp: inherit;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  @media (max-width: 1140px) {
    .stores-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 720px) {
    .stores-grid {
      grid-template-columns: 1fr;
      gap: 1.5rem;
      padding: 0 1rem;
      box-sizing: border-box;
      width: 100%;
      max-width: 500px;
      margin: 0 auto;
    }
  }

  @media (max-width: 360px) {
    .stores-container {
      padding: 1.5rem 0.5rem;
    }

    .store-card {
      padding: 1.25rem;
    }
  }
</style>
