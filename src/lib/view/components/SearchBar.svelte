<script>
  import { createEventDispatcher, onMount } from 'svelte';

  const dispatch = createEventDispatcher();
  let searchQuery = '';

  // Initialize searchQuery from URL on mount
  onMount(() => {
    const params = new URLSearchParams(window.location.search);
    searchQuery = params.get('searchQuery') || '';
  });

  function updateURL() {
    const params = new URLSearchParams(window.location.search);
    if (searchQuery) {
      params.set('searchQuery', searchQuery);
    } else {
      params.delete('searchQuery');
    }
    window.history.pushState(
      {},
      '',
      `${window.location.pathname}?${params.toString()}`
    );
  }

  function handleInput(event) {
    searchQuery = event.target.value;
    updateURL();
    dispatch('search', { query: searchQuery });
  }

  function handleKeydown(event) {
    if (event.key === 'Enter') {
      handleSearch();
    }
  }

  function handleSearch() {
    dispatch('search', { query: searchQuery });
  }
</script>

<div class="search-container">
  <input
    type="text"
    placeholder="Search.."
    class="search-input"
    bind:value={searchQuery}
    on:input={handleInput}
    on:keydown={handleKeydown}
  />
  <button class="search-icon" on:click={handleSearch} aria-label="Search">
    <i class="fa fa-search"></i>
  </button>
</div>

<style>
  .search-container {
    position: relative;
    width: 550px;
    margin-top: 8px;
    margin-right: 16px;
  }

  .search-input {
    color: black;
    width: 100%;
    padding: 10px 45px 10px 20px;
    border-radius: 8px;
    font-size: 17px;
    border: 1px solid #ccc;
    outline: none;
    box-sizing: border-box;
  }

  .search-icon {
    position: absolute;
    top: 42.5%;
    right: 12px;
    transform: translateY(-50%);
    background-color: #f1f1f1;
    border-radius: 50%;
    padding: 6px;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    color: gray;
    cursor: pointer;
  }

  .search-icon:hover {
    background-color: #1a0c46;
    color: #f1f1f1;
  }

  @media screen and (max-width: 600px) {
    .search-container {
      width: 100%;
      margin: 0;
    }

    .search-input {
      padding: 14px;
    }
  }
</style>
