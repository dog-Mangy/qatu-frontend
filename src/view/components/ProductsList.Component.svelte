<script>
    export let products = [];
</script>

<div class="products-container">
    <h2 class="section-title">Our Products</h2>
    <div class="products-grid">
        {#each products as product (product.id)}
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
        {/each}
    </div>
</div>

<style>
    .products-container {
        padding: 2rem 1rem;
        max-width: 1400px;
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

    .product-card {
        background: white;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        transition: transform 0.3s ease, box-shadow 0.3s ease;
        width: 100%;
        max-width: 280px;
    }
</style>