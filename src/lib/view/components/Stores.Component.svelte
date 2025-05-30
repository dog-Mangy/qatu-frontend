<script>
  export let stores = [];

  function navigateToHome() {
    window.location.href = '/#/';
  }
</script>

<div class="stores-container">
  <div class="title-container">
    <h2 class="section-title">Stores</h2>
  </div>

  <div class="stores-grid">
    {#each stores as store (store.id)}
      <!-- svelte-ignore a11y_click_events_have_key_events -->
      <!-- svelte-ignore a11y_no_static_element_interactions -->
      <div class="store-card" on:click={navigateToHome}>
        <div class="store-info">
          <h3 class="store-name">{store.name}</h3>
          <p class="store-created">Created: {store.createdAt}</p>
          <p class="store-description">{store.description}</p>
        </div>
      </div>
    {/each}
  </div>
</div>
