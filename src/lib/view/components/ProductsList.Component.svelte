<script>
  import ProductCard from './ProductCard.Component.svelte';
  import { onMount } from 'svelte';
  import { authService } from '../../viewmodel/services/authService.js';

  export let products = [];
  export let isStoreView = false;

  let isVendor = false;

  onMount(async () => {
    isVendor = await authService.isVendor();
  });
</script>

<div class="products-container">
  <div class="title-container">
    <h2 class="section-title">Products</h2>
    {#if isVendor && isStoreView}
      <a href="/#/mystore/create-product" class="add-product-btn"
        >Add a product</a
      >
    {/if}
  </div>
  <div class="products-grid">
    {#each products as product (product.id)}
      <ProductCard {product} />
    {/each}
  </div>
</div>

<style>
  .products-container {
    padding: 2rem 1rem;
    max-width: 1200px;
    margin: 0 auto;
  }

  .title-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
  }

  .section-title {
    text-align: center;
    font-size: 2rem;
    color: #333;
    margin: 0;
  }

  .add-product-btn {
    background-color: #3f028f;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    text-decoration: none;
    font-weight: 500;
    transition: background-color 0.3s;
  }

  .add-product-btn:hover {
    background-color: #5a0bb8;
  }

  .products-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2rem;
    justify-items: center;
  }

  @media (max-width: 1140px) {
    .products-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  @media (max-width: 900px) {
    .products-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 1.5rem;
    }
  }

  @media (max-width: 600px) {
    .products-grid {
      grid-template-columns: 1fr;
    }

    .section-title {
      font-size: 1.5rem;
    }

    .title-container {
      flex-direction: column;
      gap: 1rem;
      align-items: flex-start;
    }

    .add-product-btn {
      width: 100%;
      text-align: center;
    }
  }
</style>
