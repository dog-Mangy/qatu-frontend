<script>
  import { onMount } from 'svelte';
  import StoresComponent from '../components/Stores.Component.svelte';
  import PaginationComponent from '../components/Pagination.Component.svelte';
  import { fetchStoresPaged } from '../../viewmodel/viewmodels/storesViewModel';

  let stores = [];
  let currentPage = 1;
  let totalPages = 1;
  let isLoading = true;
  let error = null;
  const pageSize = 1;

  async function loadStores(page = 1) {
    isLoading = true;
    error = null;
    try {
      const response = await fetchStoresPaged({
        page,
        pageSize,
      });
      stores = response.items;
      currentPage = response.page;
      totalPages = response.totalPages;
    } catch (err) {
      console.error('Error loading stores:', err);
      error = err.message;
      stores = [];
    } finally {
      isLoading = false;
    }
  }

  function handlePageChange(page) {
    loadStores(page);
  }

  onMount(() => {
    loadStores();
  });
</script>

<main>
  {#if isLoading}
    <div class="loading">Loading stores...</div>
  {:else if error}
    <div class="error">Error: {error}</div>
  {:else}
    <StoresComponent {stores} />
    {#if totalPages > 1}
      <PaginationComponent
        {currentPage}
        {totalPages}
        onPageChange={handlePageChange}
      />
    {/if}
  {/if}
</main>

<style>
  .loading,
  .error {
    text-align: center;
    padding: 2rem;
    font-size: 1.2rem;
  }

  .error {
    color: #d32f2f;
  }
</style>
