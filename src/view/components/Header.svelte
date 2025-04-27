<script>
    import SearchBar from './SearchBar.svelte';
    import Navbar from './NavBar.svelte';

  
    export let userRole; // <-- Recibimos el role aquí
  </script>
  
  <style>
    .navbar {
      background-color: #3f028f;
      color: white;
      padding: 10px 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      position: relative;
    }
  
    .navbar-brand {
      font-size: 1.5em;
      font-weight: bold;
    }

  </style>
  
  <nav class="navbar">
    <div class="navbar-brand">Qatu</div>
  
    <SearchBar />
  

    <Navbar {userRole} />
  </nav>
  