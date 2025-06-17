<script>
  import Banner from '../components/Banner.Component.svelte';
  import ProductsList from '../components/ProductsList.Component.svelte';
  import {
    productStore,
    fetchProducts,
  } from '../../viewmodel/services/productService';
  import { filters } from '../../viewmodel/store/filterStore';
  import { onMount } from 'svelte';

  let currentFilters;
  const unsubscribeFilters = filters.subscribe(value => {
    currentFilters = { ...value };
  });

  let products = [];
  let isLoading = false;
  let error = '';
  let images = [];
  let nElements = 0;

  const unsubscribeProducts = productStore.subscribe(state => {
    products = state.products;
    isLoading = state.isLoading;
    error = state.error;
    nElements = state.nElements;
  });

  $: totalPages = Math.ceil(nElements / 8);

  function getRandomImages(products, count = 8) {
    if (!products || products.length === 0) return [];
    const imageUrls = products
      .filter(product => product.image)
      .map(product => product.image);
    for (let i = imageUrls.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [imageUrls[i], imageUrls[j]] = [imageUrls[j], imageUrls[i]];
    }
    return imageUrls.slice(0, Math.min(count, imageUrls.length));
  }

  $: images = getRandomImages(products, 8);

  function nextPage() {
    filters.update(f => {
      const updated = { ...f, page: f.page + 1 };
      fetchProducts(updated);
      return updated;
    });
  }

  function prevPage() {
    filters.update(f => {
      const updated = { ...f, page: Math.max(1, f.page - 1) };
      fetchProducts(updated);
      return updated;
    });
  }

  onMount(() => {
    fetchProducts(currentFilters);
    return () => {
      unsubscribeFilters();
      unsubscribeProducts();
    };
  });
</script>

<main>
  <Banner containerId="my-banner" {images} />
  {#if isLoading}
    <p>Loading products...</p>
  {:else if error}
    <p class="error">Error: {error}</p>
  {:else}
    <ProductsList {products} />
    <button on:click={prevPage} disabled={currentFilters.page === 1}
      >Previous</button
    >
    <button on:click={nextPage} disabled={currentFilters.page >= totalPages}
      >Next</button
    >
  {/if}
</main>

<style>
  .error {
    color: red;
    font-weight: bold;
  }
</style>
