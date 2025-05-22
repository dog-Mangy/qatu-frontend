<script>
  import { slide } from 'svelte/transition';
  import { onMount } from 'svelte';
  import { authService } from '../../viewmodel/services/authService.js';

  let isOpen = false;
  let currentUser = null;
  let isLoading = true;
  let roleLinks = [];

  onMount(async () => {
    currentUser = await authService.getUser();

    if (await authService.isAdmin()) {
      roleLinks = linksByRole.admin;
    } else if (await authService.isVendor()) {
      roleLinks = linksByRole.seller;
    } else if (await authService.isUser()) {
      roleLinks = linksByRole.buyer;
    } else {
      roleLinks = linksByRole.guest;
    }

    isLoading = false;
  });

  const linksByRole = {
    buyer: [
      { name: 'Home', href: '/#/' },
      { name: 'Stores', href: '#' },
      { name: 'Products', href: '/#/' },
      { name: 'Chats', href: '#' },
      { name: 'Logout', href: '#' },
    ],
    seller: [
      { name: 'Home', href: '/#/' },
      { name: 'My Store', href: '#' },
      { name: 'Chats', href: '#' },
      { name: 'Logout', href: '#' },
    ],
    admin: [
      { name: 'Home', href: '/#/' },
      { name: 'Requests', href: '#' },
      { name: 'Logout', href: '#' },
    ],
    guest: [
      { name: 'Home', href: '/#/' },
      { name: 'Login', href: '/#/login' },
      { name: 'Register', href: '/#/register' },
    ],
  };

  function toggleNavbar() {
    isOpen = !isOpen;
  }

  function handleLogout(e) {
    e.preventDefault();
    authService.logout();
  }
</script>

<!-- Botón hamburguesa -->
<button class="navbar-toggle" on:click={toggleNavbar}> &#9776; </button>

<!-- Menú con transición 'slide' -->
{#if isOpen}
  <ul class="navbar-links show" transition:slide={{ duration: 300 }}>
    {#each roleLinks as link}
      <li>
        {#if link.name === 'Logout'}
          <a href={link.href} on:click|preventDefault={handleLogout}
            >{link.name}</a
          >
        {:else}
          <a href={link.href}>{link.name}</a>
        {/if}
      </li>
    {/each}
  </ul>
{:else}
  <ul class="navbar-links">
    {#each roleLinks as link}
      <li>
        {#if link.name === 'Logout'}
          <a href={link.href} on:click|preventDefault={handleLogout}
            >{link.name}</a
          >
        {:else}
          <a href={link.href}>{link.name}</a>
        {/if}
      </li>
    {/each}
  </ul>
{/if}

<style>
  .navbar-links {
    list-style: none;
    display: flex;
    gap: 20px;
    align-items: center;
    margin: 0;
    padding: 0;
  }

  .navbar-links li a {
    color: white;
    text-decoration: none;
  }

  .navbar-toggle {
    display: none;
    font-size: 1.8rem;
    background: none;
    border: none;
    color: white;
    cursor: pointer;
  }

  @media (max-width: 768px) {
    .navbar-toggle {
      display: block;
    }

    .navbar-links {
      display: none;
      flex-direction: column;
      width: 100%;
      margin-top: 10px;
      background-color: #3f028f;
    }

    .navbar-links.show {
      display: flex;
    }
  }
</style>
