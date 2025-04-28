<script>
  import SearchBar from './SearchBar.svelte';
  import Navbar from './Navbar.svelte';
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

<nav class="navbar">
  <!-- Logo -->
  <div class="navbar-brand">
    <a href="/">
      <img src="https://i.ibb.co/gbgX7HSw/Chat-GPT-Image-27-abr-2025-10-39-02-a-m.png" alt="Qatu Logo" class="logo" />
    </a>
  </div>

  <!-- SearchBar -->
  {#if isDesktop || searchOpen}
    <div class="navbar-search">
      <SearchBar />
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
</nav>

<style>
  .navbar {
    background-color: #3f028f;
    color: white;
    padding: 10px 20px;
    border-radius: 15px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 10px;
  }

  .navbar-brand {
    display: flex;
    align-items: center;
    flex: 0 0 auto;
  }

  .logo {
    height: 50px;
    width: auto;
  }

  .navbar-search {
    flex-grow: 1;
    display: flex;
    justify-content: center;
    margin: 10px 0;
  }

  .navbar-actions {
    display: flex;
    align-items: center;
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
  }
</style>
