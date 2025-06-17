<script>
  import SearchBar from './SearchBar.svelte';
  import Navbar from './Navbar.svelte';
  import CategoryFilters from './Filter.Component.svelte';
  import { onMount } from 'svelte';

  export let userRole;

  let searchOpen = false;
  let isDesktop = false;

  function toggleSearch() {
    searchOpen = !searchOpen;
  }

  function handleResize() {
    isDesktop = window.innerWidth >= 768;
    if (isDesktop) {
      searchOpen = false;
    }
  }

  onMount(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  });
</script>

<div class="navbar-container">
  <nav class="navbar">
    <!-- Logo -->
    <div class="navbar-brand">
      <a href="/#">
        <img
          src="https://i.ibb.co/gbgX7HSw/Chat-GPT-Image-27-abr-2025-10-39-02-a-m.png"
          alt="Qatu Logo"
          class="logo"
        />
      </a>
    </div>

    <!-- SearchBar -->
    {#if isDesktop || searchOpen}
      <div class="navbar-search-area">
        <div class="navbar-search">
          <SearchBar />
        </div>
      </div>
    {/if}

    <!-- Icono de búsqueda y Navbar -->
    <div class="navbar-actions">
      {#if !isDesktop}
        <button class="icon-button" on:click={toggleSearch}>
          {#if searchOpen}
            ✖️
          {:else}
            🔍
          {/if}
        </button>
      {/if}
      <Navbar {userRole} />
    </div>

    {#if isDesktop || searchOpen}
      <div class="navbar-filter">
        <CategoryFilters />
      </div>
    {/if}
  </nav>
</div>

<style>
  .navbar-container {
    background: #3f028f;
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .navbar {
    background-color: #3f028f;
    color: white;
    padding: 10px 20px;
    border-radius: 15px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 10px;
    max-width: 1200px;
    width: 100%;
  }

  .navbar-search-area {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    margin: 0 10px;
  }

  .navbar-search {
    display: flex;
    justify-content: center;
  }

  .navbar-filter {
    display: flex;
    justify-content: center;
  }

  .logo {
    margin-top: 5px;
    height: 50px;
    width: auto;
  }

  .navbar-actions {
    margin-top: 16px;
    flex: 0 0 auto;
    gap: 10px;
  }

  .icon-button {
    font-size: 24px;
    background: none;
    border: none;
    color: white;
    cursor: pointer;
  }

  /* RESPONSIVE */
  @media (max-width: 768px) {
    .navbar {
      justify-content: space-between;
    }

    .navbar-search {
      width: 100%;
      margin-top: 10px;
    }

    .navbar-actions {
      gap: 5px;
    }

    .navbar-filter {
      flex: 0 0 100%;
      justify-content: center;
    }
  }
</style>
