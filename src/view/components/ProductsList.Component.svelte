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
