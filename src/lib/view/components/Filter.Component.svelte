<script>
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();
  let searchQuery = '';
  let selectedCategory = '';
  let priceMin = '';
  let priceMax = '';
  let minRating = 0;
  let maxRating = 0;
  let sortBy = 'Name';
  let ascending = true;

  let showDropdown = false;
  let showMinRatingDropdown = false;
  let showMaxRatingDropdown = false;
  let showSortByDropdown = false;
  let showOrderDropdown = false;

  const categories = [
    'All Categories',
    'Books',
    'Electronics',
    'Clothing',
    'Furniture',
  ];

  const sortByOptions = [
    { field: 'Price', label: 'Price' },
    { field: 'Name', label: 'Name' },
    { field: 'Rating', label: 'Rating' },
  ];

  const orderOptions = [
    { value: true, label: 'Ascending' },
    { value: false, label: 'Descending' },
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

  function selectSortBy(field) {
    sortBy = field;
    showSortByDropdown = false;
    dispatchSearch();
  }

  function selectOrder(value) {
    ascending = value;
    showOrderDropdown = false;
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
      sortBy,
      ascending,
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
        {selectedCategory || 'Categoríes'} ⬇
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

    <!-- Price Inputs -->
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
        Sort by: {sortBy} ⬇
      </div>
      {#if showSortByDropdown}
        <ul class="dropdown-menu">
          {#each sortByOptions as option}
            <li
              role="option"
              tabindex="0"
              aria-selected={sortBy === option.field}
              on:click={() => selectSortBy(option.field)}
              on:keydown={e =>
                (e.key === 'Enter' || e.key === ' ') &&
                selectSortBy(option.field)}
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
        {ascending ? 'Ascending' : 'Descending'} ⬇
      </div>
      {#if showOrderDropdown}
        <ul class="dropdown-menu">
          {#each orderOptions as option}
            <li
              role="option"
              tabindex="0"
              aria-selected={ascending === option.value}
              on:click={() => selectOrder(option.value)}
              on:keydown={e =>
                (e.key === 'Enter' || e.key === ' ') &&
                selectOrder(option.value)}
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
