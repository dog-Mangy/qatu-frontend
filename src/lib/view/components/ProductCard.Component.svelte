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
      <button
        class="add-to-cart-btn"
        type="button"
        aria-label={`Add ${product.name} to cart`}
      >
        Add to Cart
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

  .add-to-cart-btn {
    background-color: #3f028f;
    color: white;
    border: none;
    padding: 0.4rem 0.8rem;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    font-size: 0.85rem;
  }

  .add-to-cart-btn:hover,
  .add-to-cart-btn:focus {
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
