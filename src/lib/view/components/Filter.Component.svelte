<script>
  import { onMount } from 'svelte';
  import { filters } from '../../viewmodel/store/filterStore';
  import { fetchProducts } from '../../viewmodel/services/productService';
  import { fetchCategories } from '../../viewmodel/viewmodels/categoryViewModel';

  let showDropdown = false;
  let showMinRatingDropdown = false;
  let showMaxRatingDropdown = false;
  let showSortByDropdown = false;
  let showOrderDropdown = false;
  let showMinPriceInput = false;
  let showMaxPriceInput = false;

  let categories = [];

  onMount(async () => {
    try {
      const data = await fetchCategories();
      categories = ['All Categories', ...data.map(cat => cat.name)];
    } catch (error) {
      console.error('Error al cargar categorías:', error);
    }
  });

  const sortByOptions = [
    { field: 'Price', label: 'Price' },
    { field: 'Name', label: 'Name' },
    { field: 'Rating', label: 'Rating' },
    { field: 'CreatedAt', label: 'CreatedAt' },
  ];

  const orderOptions = [
    { value: true, label: 'Ascending' },
    { value: false, label: 'Descending' },
  ];

  function selectCategory(category, event) {
    event.stopPropagation();
    filters.update(current => {
      const updated = { ...current, category };
      fetchProducts(updated);
      return updated;
    });
    showDropdown = false;
  }

  function selectMinRating(rating, event) {
    event.stopPropagation();
    filters.update(current => {
      const newMaxRating =
        current.maxRating >= 0 && rating > current.maxRating
          ? rating
          : current.maxRating;
      const updated = {
        ...current,
        minRating: rating,
        maxRating: newMaxRating,
      };
      fetchProducts(updated);
      return updated;
    });
    showMinRatingDropdown = false;
  }

  function selectMaxRating(rating, event) {
    event.stopPropagation();
    filters.update(current => {
      const newMinRating =
        current.minRating >= 0 && rating < current.minRating
          ? rating
          : current.minRating;
      const updated = {
        ...current,
        maxRating: rating,
        minRating: newMinRating,
      };
      fetchProducts(updated);
      return updated;
    });
    showMaxRatingDropdown = false;
  }

  function selectSortBy(field, event) {
    event.stopPropagation();
    filters.update(current => {
      const updated = { ...current, sortBy: field };
      fetchProducts(updated);
      return updated;
    });
    showSortByDropdown = false;
  }

  function selectOrder(value, event) {
    event.stopPropagation();
    filters.update(current => {
      const updated = { ...current, ascending: value };
      fetchProducts(updated);
      return updated;
    });
    showOrderDropdown = false;
  }

  function handleMinPriceInput(event) {
    const value = event.target.value;
    filters.update(current => {
      const updated = { ...current, minPrice: value };
      fetchProducts(updated);
      return updated;
    });
  }

  function handleMaxPriceInput(event) {
    const value = event.target.value;
    filters.update(current => {
      const updated = { ...current, maxPrice: value };
      fetchProducts(updated);
      return updated;
    });
  }
</script>

<div class="filters-container">
  <div class="filter-group">
    <!-- Category Dropdown -->
    <div
      class="dropdown"
      role="button"
      tabindex="0"
      on:click={() => (showDropdown = !showDropdown)}
      on:keydown={e =>
        (e.key === 'Enter' || e.key === ' ') && (showDropdown = !showDropdown)}
    >
      <div class="dropdown-label">
        {$filters.category || 'Categories'} ⬇
      </div>
      {#if showDropdown}
        <ul class="dropdown-menu">
          {#each categories as category (category)}
            <li
              role="option"
              tabindex="0"
              aria-selected={$filters.category === category}
              on:click={event => selectCategory(category, event)}
              on:keydown={e =>
                (e.key === 'Enter' || e.key === ' ') &&
                selectCategory(category, e)}
            >
              {category}
            </li>
          {/each}
        </ul>
      {/if}
    </div>

    <!-- Min Rating Dropdown -->
    <div
      class="dropdown rating"
      role="button"
      tabindex="0"
      on:click={() => (showMinRatingDropdown = !showMinRatingDropdown)}
      on:keydown={e =>
        (e.key === 'Enter' || e.key === ' ') &&
        (showMinRatingDropdown = !showMinRatingDropdown)}
    >
      <div class="dropdown-label">
        {$filters.minRating >= 0 ? `Min: ${$filters.minRating}★` : 'Min Rating'}
      </div>
      {#if showMinRatingDropdown}
        <div class="dropdown-menu rating-menu">
          <div class="rating-filter">
            {#each Array(6) as _, index (index)}
              <span
                role="button"
                tabindex="0"
                class="star {index <= $filters.minRating ? 'filled' : ''}"
                on:click={event => selectMinRating(index, event)}
                on:keydown={e =>
                  (e.key === 'Enter' || e.key === ' ') &&
                  selectMinRating(index, e)}
              >
                {index === 0 ? '0★' : '★'}
              </span>
            {/each}
          </div>
        </div>
      {/if}
    </div>

    <!-- Max Rating Dropdown -->
    <div
      class="dropdown rating"
      role="button"
      tabindex="0"
      on:click={() => (showMaxRatingDropdown = !showMaxRatingDropdown)}
      on:keydown={e =>
        (e.key === 'Enter' || e.key === ' ') &&
        (showMaxRatingDropdown = !showMaxRatingDropdown)}
    >
      <div class="dropdown-label">
        {$filters.maxRating >= 0 ? `Max: ${$filters.maxRating}★` : 'Max Rating'}
      </div>
      {#if showMaxRatingDropdown}
        <div class="dropdown-menu rating-menu">
          <div class="rating-filter">
            {#each Array(6) as _, index (index)}
              <span
                role="button"
                tabindex="0"
                class="star {index <= $filters.maxRating ? 'filled' : ''}"
                on:click={event => selectMaxRating(index, event)}
                on:keydown={e =>
                  (e.key === 'Enter' || e.key === ' ') &&
                  selectMaxRating(index, e)}
              >
                {index === 0 ? '0★' : '★'}
              </span>
            {/each}
          </div>
        </div>
      {/if}
    </div>

    <!-- Min Price Input -->
    <div
      class="dropdown price"
      role="button"
      tabindex="0"
      on:click={() => (showMinPriceInput = true)}
      on:keydown={e =>
        (e.key === 'Enter' || e.key === ' ') && (showMinPriceInput = true)}
    >
      <div class="dropdown-label">
        {#if $filters.minPrice !== null && $filters.minPrice !== undefined && !showMinPriceInput}
          Min: ${$filters.minPrice}
        {:else}
          Min Price
          {#if showMinPriceInput}
            <input
              type="number"
              placeholder="Min Price"
              class="price-input"
              bind:value={$filters.minPrice}
              on:input={handleMinPriceInput}
              on:blur={() => (showMinPriceInput = false)}
            />
          {/if}
        {/if}
      </div>
    </div>

    <!-- Max Price Input -->
    <div
      class="dropdown price"
      role="button"
      tabindex="0"
      on:click={() => (showMaxPriceInput = true)}
      on:keydown={e =>
        (e.key === 'Enter' || e.key === ' ') && (showMaxPriceInput = true)}
    >
      <div class="dropdown-label">
        {#if $filters.maxPrice !== null && $filters.maxPrice !== undefined && !showMaxPriceInput}
          Max: ${$filters.maxPrice}
        {:else}
          Max Price
          {#if showMaxPriceInput}
            <input
              type="number"
              placeholder="Max Price"
              class="price-input"
              bind:value={$filters.maxPrice}
              on:input={handleMaxPriceInput}
              on:blur={() => (showMaxPriceInput = false)}
            />
          {/if}
        {/if}
      </div>
    </div>

    <!-- Sort By Dropdown -->
    <div
      class="dropdown"
      role="button"
      tabindex="0"
      on:click={() => (showSortByDropdown = !showSortByDropdown)}
      on:keydown={e =>
        (e.key === 'Enter' || e.key === ' ') &&
        (showSortByDropdown = !showSortByDropdown)}
    >
      <div class="dropdown-label">
        Sort by: {$filters.sortBy} ⬇
      </div>
      {#if showSortByDropdown}
        <ul class="dropdown-menu">
          {#each sortByOptions as option (option.field)}
            <li
              role="option"
              tabindex="0"
              aria-selected={$filters.sortBy === option.field}
              on:click={event => selectSortBy(option.field, event)}
              on:keydown={e =>
                (e.key === 'Enter' || e.key === ' ') &&
                selectSortBy(option.field, e)}
            >
              {option.label}
            </li>
          {/each}
        </ul>
      {/if}
    </div>

    <!-- Order Dropdown -->
    <div
      class="dropdown"
      role="button"
      tabindex="0"
      on:click={() => (showOrderDropdown = !showOrderDropdown)}
      on:keydown={e =>
        (e.key === 'Enter' || e.key === ' ') &&
        (showOrderDropdown = !showOrderDropdown)}
    >
      <div class="dropdown-label">
        {$filters.ascending ? 'Ascending' : 'Descending'} ⬇
      </div>
      {#if showOrderDropdown}
        <ul class="dropdown-menu">
          {#each orderOptions as option (option.value)}
            <li
              role="option"
              tabindex="0"
              aria-selected={$filters.ascending === option.value}
              on:click={event => selectOrder(option.value, event)}
              on:keydown={e =>
                (e.key === 'Enter' || e.key === ' ') &&
                selectOrder(option.value, e)}
            >
              {option.label}
            </li>
          {/each}
        </ul>
      {/if}
    </div>
  </div>
</div>

<style>
  .filters-container {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    align-items: center;
  }
  .filter-group {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    align-items: center;
  }

  .dropdown {
    position: relative;
    cursor: pointer;
    padding: 2px 5px;
    border-radius: 8px;
    min-width: 150px;
    font-size: 16px;
    color: white;
    background-color: #3f028f;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .rating {
    width: auto;
  }

  .price {
    min-width: 115px;
  }

  .rating-filter {
    display: flex;
    gap: 4px;
    cursor: pointer;
    color: white;
  }

  .star {
    font-size: 20px;
    color: #ccc;
    transition: color 0.2s;
  }

  .star.filled {
    color: gold;
  }

  .price-input {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 16px;
    color: #3f028f;
    background-color: white;
    z-index: 10;
  }

  .price-input::placeholder {
    color: #3f028f;
    opacity: 0.7;
  }

  .dropdown-menu {
    position: absolute;
    top: 100%;
    left: 0;
    background-color: white;
    border: 1px solid #ccc;
    border-radius: 8px;
    color: #3f028f;
    list-style: none;
    padding: 0;
    z-index: 10;
    width: 100%;
  }

  .dropdown-menu li {
    padding: 10px;
    cursor: pointer;
  }

  .dropdown-label {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: auto;
  }

  @media screen and (max-width: 600px) {
    .filters-container {
      flex-direction: column;
      align-items: stretch;
    }

    .dropdown,
    .price {
      min-width: 100%;
    }

    .rating {
      min-width: 100%;
    }
  }
</style>
