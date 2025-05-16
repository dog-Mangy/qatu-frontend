<script>
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();
  let searchQuery = '';
  let selectedCategory = '';
  let priceMin = '';
  let priceMax = '';
  let minRating = 0;
  let maxRating = 0;

  let showDropdown = false;
  let showMinRatingDropdown = false;
  let showMaxRatingDropdown = false;

  const categories = [
    'All Categories',
    'Books',
    'Electronics',
    'Clothing',
    'Furniture',
  ];

  function selectCategory(category) {
    selectedCategory = category;
    showDropdown = false;
    dispatchSearch();
  }

  function selectMinRating(rating) {
    minRating = rating;
    if (maxRating > 0 && minRating > maxRating) {
      maxRating = minRating;
    }
    dispatchSearch();
  }

  function selectMaxRating(rating) {
    maxRating = rating;
    if (minRating > 0 && maxRating < minRating) {
      minRating = maxRating;
    }
    dispatchSearch();
  }

  function dispatchSearch() {
    dispatch('search', {
      query: searchQuery,
      category: selectedCategory,
      minRating,
      maxRating,
      minPrice: priceMin,
      maxPrice: priceMax,
    });
  }
</script>

<div class="filters-container">
  <div class="filter-group">
    <div
      class="dropdown"
      role="button"
      tabindex="0"
      on:click={() => (showDropdown = !showDropdown)}
      on:keydown={e =>
        (e.key === 'Enter' || e.key === ' ') && (showDropdown = !showDropdown)}
    >
      <div class="dropdown-label">
        {selectedCategory || 'Categorías'} ⬇
      </div>
      {#if showDropdown}
        <ul class="dropdown-menu">
          {#each categories as category}
            <li
              role="option"
              tabindex="0"
              aria-selected={selectedCategory === category}
              on:click={() => selectCategory(category)}
              on:keydown={e =>
                (e.key === 'Enter' || e.key === ' ') &&
                selectCategory(category)}
            >
              {category}
            </li>
          {/each}
        </ul>
      {/if}
    </div>

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
        {minRating > 0 ? `Min: ${minRating}★` : 'Min Rating'}
      </div>
      {#if showMinRatingDropdown}
        <div class="dropdown-menu rating-menu">
          <div class="rating-filter">
            {#each Array(5) as _, index}
              <span
                role="button"
                tabindex="0"
                class="star {index < minRating ? 'filled' : ''}"
                on:click={() => {
                  selectMinRating(index + 1);
                  showMinRatingDropdown = false;
                }}
                on:keydown={e =>
                  (e.key === 'Enter' || e.key === ' ') &&
                  (selectMinRating(index + 1), (showMinRatingDropdown = false))}
              >
                ★
              </span>
            {/each}
          </div>
        </div>
      {/if}
    </div>

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
        {maxRating > 0 ? `Max: ${maxRating}★` : 'Max Rating'}
      </div>
      {#if showMaxRatingDropdown}
        <div class="dropdown-menu rating-menu">
          <div class="rating-filter">
            {#each Array(5) as _, index}
              <span
                role="button"
                tabindex="0"
                class="star {index < maxRating ? 'filled' : ''}"
                on:click={() => {
                  selectMaxRating(index + 1);
                  showMaxRatingDropdown = false;
                }}
                on:keydown={e =>
                  (e.key === 'Enter' || e.key === ' ') &&
                  (selectMaxRating(index + 1), (showMaxRatingDropdown = false))}
              >
                ★
              </span>
            {/each}
          </div>
        </div>
      {/if}
    </div>

    <input
      type="number"
      placeholder="Min Price"
      class="dropdown-input"
      bind:value={priceMin}
      on:input={dispatchSearch}
    />
    <input
      type="number"
      placeholder="Max Price"
      class="dropdown-input second-input"
      bind:value={priceMax}
      on:input={dispatchSearch}
    />
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
  }

  .dropdown {
    position: relative;
    cursor: pointer;
    padding: 2px 5px;
    border-radius: 8px;
    min-width: 150px;
    font-size: 16px;
    color: white;
  }

  .rating {
    min-width: 90px;
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

  .dropdown-input {
    position: relative;
    cursor: pointer;
    padding: 2px 16px;
    border-radius: 8px;
    max-width: 115px;
    font-size: 16px;
    color: white;
    background-color: transparent;
    border: none;
  }

  .second-input {
    margin-right: 50px;
  }

  .dropdown-input::placeholder {
    color: white;
    opacity: 1;
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
  }

  @media screen and (max-width: 600px) {
    .filters-container {
      flex-direction: column;
      align-items: stretch;
    }
  }
</style>
