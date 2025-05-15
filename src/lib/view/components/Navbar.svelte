<script>
  import { slide } from 'svelte/transition';
  export let userRole = 'buyer';
  let isOpen = false;

  const linksByRole = {
    buyer: [
      { name: 'Home', href: '/#/' },
      { name: 'Stores', href: '#' },
      { name: 'Products', href: '/#/' },
      { name: 'Chats', href: '#' },
      { name: 'Login', href: '/#/login' },
    ],
    seller: [
      { name: 'Home', href: '/#/' },
      { name: 'My Store', href: '#' },
      { name: 'Chats', href: '#' },
      { name: 'Login', href: '/#/login' },
    ],
    admin: [
      { name: 'Home', href: '/#/' },
      { name: 'Requests', href: '#' },
      { name: 'Login', href: '/#/login' },
    ],
  };

  function toggleNavbar() {
    isOpen = !isOpen;
  }

  $: roleLinks = linksByRole[userRole] || [];
</script>

<!-- Botón hamburguesa -->
<button class="navbar-toggle" on:click={toggleNavbar}> &#9776; </button>

<!-- Menú con transición 'slide' -->
{#if isOpen}
  <ul class="navbar-links show" transition:slide={{ duration: 300 }}>
    {#each roleLinks as link}
      <li>
        <a href={link.href}>{link.name}</a>
      </li>
    {/each}
  </ul>
{:else}
  <ul class="navbar-links">
    {#each roleLinks as link}
      <li>
        <a href={link.href}>{link.name}</a>
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

  /* El botón no se muestra en escritorio */
  .navbar-toggle {
    display: none;
    font-size: 1.8rem;
    background: none;
    border: none;
    color: white;
    cursor: pointer;
  }

  /* Responsive */
  @media (max-width: 768px) {
    .navbar-toggle {
      display: block;
    }

    .navbar-links {
      display: none;
      flex-direction: column;
      width: 100%;
      margin-top: 10px;
      background-color: #3f028f; /* Para que se vea bien */
    }

    .navbar-links.show {
      display: flex;
    }
  }
</style>
