<script>
  import { filters } from '../../viewmodel/store/filterStore';

  function handleInput(event) {
    filters.update(current => ({
      ...current,
      searchQuery: event.target.value,
    }));
  }

  function handleKeydown(event) {
    if (event.key === 'Enter') {
      window.location.assign('/#');
    }
  }
</script>

<div class="search-container">
  <input
    type="text"
    placeholder="Search.."
    class="search-input"
    bind:value={$filters.searchQuery}
    on:input={handleInput}
    on:keydown={handleKeydown}
  />
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
