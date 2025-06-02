
<script>
  import { onMount } from 'svelte';
  import ProductsList from '../components/ProductsList.Component.svelte';
  import StoreRatingInfo from '../components/StoreRatingInfo.svelte';
  import PaginationComponent from '../components/Pagination.Component.svelte';
  import { getProductsByStoreId } from '../../viewmodel/viewmodels/productViewModel';
  import { getStoreById } from '../../viewmodel/viewmodels/storeViewModel';
  
  export let id;

  let products = [];
  let currentPage = 1;
  let totalPages = 1;
  let isLoading = true;
  let error = null;
  const pageSize = 9;
  let currentStore = null;

  const storeRating = {
    average: 4.23,
    totalRatings: 60,
    comments: [
      {
        id: 1,
        user: 'Juan Pérez',
        rating: 5,
        comment: 'Excelente calidad en todos los productos. Muy recomendado!',
        date: '2023-10-15'
      },
      {
        id: 2,
        user: 'María García',
        rating: 4,
        comment: 'Buen servicio, los productos llegaron a tiempo.',
        date: '2023-09-28'
      },
      {
        id: 3,
        user: 'Carlos López',
        rating: 3,
        comment: 'Algunos productos no coincidían exactamente con las fotos, pero en general bien.',
        date: '2023-09-10'
      },
      {
        id: 4,
        user: 'Ana Martínez',
        rating: 5,
        comment: 'Increíble atención al cliente y productos de primera calidad.',
        date: '2023-08-22'
      }
    ]
  };

  async function loadProducts(page = 1) {
    isLoading = true;
    error = null;
    try {
      currentStore = await getStoreById(id);
      
      if (!currentStore) {
        throw new Error('Store not found');
      }
      
      const productsResponse = await getProductsByStoreId(id, {
        page,
        pageSize,
      });
      
      products = productsResponse.items.map(product => ({
        ...product,
        image: product.image,
        id_Store: id
      }));

      currentPage = productsResponse.page;
      totalPages = productsResponse.totalPages;
    } catch (err) {
      console.error('Error loading store products:', err);
      error = err.message;
      products = [];
    } finally {
      isLoading = false;
    }
  }

  function handlePageChange(page) {
    loadProducts(page);
  }

  onMount(() => {
    if (!id) {
      const hash = window.location.hash;
      const match = hash.match(/\/store\/([^\/]+)/);
      id = match ? match[1] : null;
    }
    loadProducts();
  });
</script>

<main>
  {#if isLoading}
    <div class="loading">Loading products...</div>
  {:else if error}
    <div class="error">Error: {error}</div>
  {:else}
    {#if currentStore}
      <div class="store-header">
        <h1 class="store-title">{currentStore.name}</h1>
        <p class="store-description">{currentStore.description}</p>
      </div>
    {/if}
    
    <ProductsList {products}/>
    
    {#if totalPages > 1}
      <PaginationComponent
        {currentPage}
        {totalPages}
        onPageChange={handlePageChange}
      />
    {/if}
    
    <StoreRatingInfo {storeRating} />
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

  .store-header {
    text-align: center;
    margin-bottom: 2rem;
    padding: 0 1rem;
  }

  .store-title {
    margin: 1rem 0 0.5rem 0;
    color: #333;
    font-size: 2rem;
  }

  .store-description {
    color: #666;
    margin-bottom: 1.5rem;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
  }
</style>