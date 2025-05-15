<script>
  export let product = {};
</script>

<div class="product-card">
  <div class="product-image-container">
    <img
      src={product.image}
      alt={product.name}
      class="product-image"
      loading="lazy"
    />
  </div>
  <div class="product-info">
    <h3 class="product-name">{product.name}</h3>
    <p class="product-description">{product.description}</p>
    <div class="product-footer">
      <span class="product-price">${product.price.toFixed(2)}</span>
    </div>
    <div class="product-actions">
      <button
        class="view-product-btn"
        type="button"
        aria-label={`View ${product.name} in store`}
        on:click={() =>
          (window.location.href = `/#/store/${product.id_Store}/product/${product.id}`)}
      >
        View Product
      </button>

      <button
        class="chat-seller-btn"
        type="button"
        aria-label={`Chat with seller of ${product.name}`}
        on:click={() => alert('Chat with seller feature coming soon')}
      >
        Chat with Seller
      </button>
    </div>
  </div>
</div>

<style>
  .product-card {
    background: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition:
      transform 0.3s ease,
      box-shadow 0.3s ease;
    width: 100%;
    max-width: 280px;
  }

  .product-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }

  .product-image-container {
    height: 200px;
    overflow: hidden;
  }

  .product-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  .product-card:hover .product-image {
    transform: scale(1.05);
  }

  .product-info {
    padding: 1.25rem;
  }

  .product-name {
    margin: 0 0 0.5rem 0;
    font-size: 1.1rem;
    color: #222;
  }

  .product-description {
    margin: 0 0 1rem 0;
    color: #666;
    font-size: 0.85rem;
    line-height: 1.4;
  }

  .product-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .product-price {
    font-weight: bold;
    color: #2c3e50;
    font-size: 1rem;
  }

  .product-actions {
    margin-top: 1rem;
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  .view-product-btn,
  .chat-seller-btn {
    background-color: #3f028f;
    color: white;
    border: none;
    padding: 0.4rem 0.8rem;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.85rem;
    text-align: center;
    text-decoration: none;
    transition: background-color 0.3s ease;
  }

  .chat-seller-btn:hover,
  .view-product-btn:hover,
  .chat-seller-btn:focus,
  .view-product-btn:focus {
    background-color: #6d00fc;
    outline: none;
  }

  @media (max-width: 900px) {
    .product-card {
      max-width: 300px;
    }
  }

  @media (max-width: 600px) {
    .product-card {
      max-width: 100%;
    }
  }
</style>
