<script>
  import ProductCard from './ProductCard.Component.svelte';

  export let products = [];
</script>

<div class="products-container">
  <h2 class="section-title">Products</h2>
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

  .section-title {
    text-align: center;
    margin-bottom: 2rem;
    font-size: 2rem;
    color: #333;
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
  }
</style>
