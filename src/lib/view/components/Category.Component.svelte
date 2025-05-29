<script>
  import { createEventDispatcher } from 'svelte';
  export let categories = [];

  const dispatch = createEventDispatcher();

  function handleDelete(id, e) {
    e.stopPropagation();
    dispatch('deleteCategory', { id });
  }

  function handleView(category) {
    dispatch('viewCategory', { category });
  }
</script>

<div class="categories-container">
  <h2 class="section-title">Categories</h2>
  <div class="categories-grid">
    {#each categories as category (category.id)}
      <div
        class="category-card"
        role="button"
        tabindex="0"
        on:click={() => dispatch('viewCategory', { category })}
        on:keydown={e =>
          (e.key === 'Enter' || e.key === ' ') &&
          dispatch('viewCategory', { category })}
      >
        <button
          class="delete-button"
          on:click|stopPropagation={e => handleDelete(category.id, e)}>✕</button
        >

        <div class="category-image-container">
          <img
            src={category.image}
            alt={category.name}
            class="category-image"
            loading="lazy"
          />
        </div>
        <div class="category-name">{category.name}</div>
      </div>
    {/each}

    <div
      class="category-card add-card"
      role="button"
      tabindex="0"
      on:click={() => dispatch('createCategory')}
      on:keydown={e =>
        (e.key === 'Enter' || e.key === ' ') && dispatch('createCategory')}
    >
      <div class="plus-icon">+</div>
      <div class="category-name">Nueva</div>
    </div>
  </div>
</div>

<style>
  .categories-container {
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

  .categories-grid {
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    gap: 2rem;
    justify-items: center;
  }

  .category-card {
    position: relative;
  }

  .delete-button {
    position: absolute;
    top: 4px;
    right: 4px;
    background-color: red;
    color: white;
    border: none;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    font-size: 12px;
    cursor: pointer;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.2s ease;
  }

  .category-card:hover .delete-button {
    opacity: 1;
    pointer-events: auto;
  }

  .category-card {
    background: white;
    border-radius: 6px;
    overflow: hidden;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 100px;
    text-align: center;
    cursor: pointer;
    transition:
      transform 0.2s ease,
      box-shadow 0.2s ease;
  }

  .category-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }

  .category-image-container {
    height: 60px;
    width: 100%;
    justify-content: center;
    overflow: hidden;
    background-color: #f5f5f5;
  }

  .category-image {
    width: 50%;
    height: 60%;
    object-fit: cover;
  }

  .category-name {
    padding: 0.5rem;
    font-size: 0.9rem;
    font-weight: 600;
    color: #333;
  }

  .add-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #555;
    background-color: #f0f0f0;
    border: 2px dashed #aaa;
  }

  .add-card:hover {
    background-color: #e0e0e0;
  }

  .plus-icon {
    font-size: 2rem;
    font-weight: bold;
  }
</style>
