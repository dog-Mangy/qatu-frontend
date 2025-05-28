<script>
  import { params } from 'svelte-spa-router';
  import { onMount } from 'svelte';

  let product = null;
  let loading = true;
  let error = '';


  async function fetchProduct(id_Store, id) {

    return {
      id,
      id_Store,
      name: 'Nombre de producto',
      description: 'Descripción del producto',
      image: 'https://images.pexels.com/photos/30028610/pexels-photo-30028610/free-photo-of-constelacion-de-orion.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      storeName: 'Nombre de la tienda',
      rating: 4.5,
      interactions: 12,
      comments: [
        { text: 'Buen producto', rating: 5 },
        { text: 'Regular', rating: 3 }
      ]
    };
  }

  onMount(() => {
    const unsubscribe = params.subscribe(async ($params) => {
      try {
        const { id_Store, id } = $params;
        product = await fetchProduct(id_Store, id);
        error = '';
      } catch (e) {
        error = 'No se pudo cargar el producto';
      } finally {
        loading = false;
      }
    });
    return unsubscribe;
  });
</script>

{#if loading}
  <p>Cargando...</p>
{:else if error}
  <p>{error}</p>
{:else}
  <div class="product-detail">
    <h2 class="store-name">{product.storeName}</h2>
    <img class="product-image" src={product.image} alt={product.name} />
    <h3 class="product-name">{product.name}</h3>
    <p class="product-description">{product.description}</p>
    <div class="product-meta">
      <span class="rating">⭐ {product.rating}</span>
      <span class="interactions">{product.interactions} interactions</span>
    </div>
    <div class="actions">
      <button class="qualify-btn">Qualify</button>
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
    box-shadow: 0 4px 16px rgba(0,0,0,0.08);
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
  .qualify-btn, .chat-btn {
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