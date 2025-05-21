<script>
  import Router, { push } from 'svelte-spa-router';
  import routes from './lib/view/routes/Router.js';
  import { onMount } from 'svelte';

  import Header from './lib/view/components/Header.svelte';
  import Footer from './lib/view/components/Footer.Component.svelte';

  let userRole = 'buyer';

  onMount(() => {
    push('/');
  });
</script>

<div id="app">
  <Header {userRole} />
  <main>
    <Router {routes} />
  </main>
  <Footer />
</div>

<style>
  #app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  main {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
</style>
