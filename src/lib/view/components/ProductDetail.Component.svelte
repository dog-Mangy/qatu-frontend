<script>
  import { params } from 'svelte-spa-router';
  import { onMount } from 'svelte';
  import { getProductById } from '../../viewmodel/viewmodels/productViewModel.js';
  import { getStoreById } from '../../viewmodel/viewmodels/storeViewModel.js';

  let product = null;
  let store = null;
  let loading = true;
  let error = '';
  let isSeller = false;

  async function fetchProductAndStore(id) {
    const prod = await getProductById(id);
    let storeData = null;
    try {
      storeData = await getStoreById(prod.storeId);
    } catch (e) {
      // If store fetch fails, only show the product
    }
    return { prod, storeData };
  }

  onMount(() => {
    const unsubscribe = params.subscribe(async $params => {
      try {
        const { id } = $params;
        const { prod, storeData } = await fetchProductAndStore(id);
        product = prod;
        store = storeData;
        error = '';
      } catch (e) {
        error = 'Failed to load product';
      } finally {
        loading = false;
      }
    });
    return unsubscribe;
  });
</script>

{#if loading}
  <p>Loading...</p>
{:else if error}
  <p>{error}</p>
{:else}
  <div class="product-detail">
    <h2 class="store-name">
      {store ? store.name : 'Unknown store'}
    </h2>
    <img class="product-image" src={product.image} alt={product.name} />
    <h3 class="product-name">{product.name}</h3>
    <p class="product-description">{product.description}</p>
    <div class="product-meta">
      <span class="rating">⭐ {product.rating}</span>
      <span class="interactions">{product.interactions} interactions</span>
    </div>
    <div class="actions">
      {#if !isSeller}
        <button class="qualify-btn">Qualify</button>
      {/if}
      <button class="chat-btn">Chat with the seller</button>
    </div>
    <div class="comments">
      {#each product.comments as comment}
        <div class="comment">
          <span>{comment.text}</span>
          <span class="comment-rating">⭐ {comment.rating}</span>
        </div>
      {/each}
    </div>
  </div>
{/if}

<style>
  .product-detail {
    background: white;
    border-radius: 16px;
    max-width: 500px;
    margin: 2rem auto;
    padding: 2rem;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .store-name {
    font-weight: bold;
    margin-bottom: 1rem;
  }
  .product-image {
    width: 300px;
    height: 200px;
    object-fit: cover;
    border-radius: 8px;
    margin-bottom: 1rem;
  }
  .product-name {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }
  .product-description {
    margin-bottom: 1rem;
    color: #444;
  }
  .product-meta {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
  }
  .actions {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
  }
  .qualify-btn,
  .chat-btn {
    background: #3f028f;
    color: white;
    border: none;
    border-radius: 6px;
    padding: 0.5rem 1rem;
    cursor: pointer;
  }
  .comments {
    width: 100%;
    margin-top: 1rem;
  }
  .comment {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #eee;
    padding: 0.5rem 0;
  }
  .comment-rating {
    color: #fbc02d;
  }
</style>
