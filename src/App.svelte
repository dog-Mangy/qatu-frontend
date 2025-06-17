<script>
  import Router, { push } from 'svelte-spa-router';
  import routes from './lib/view/routes/Router.js';
  import { onMount } from 'svelte';

  import Header from './lib/view/components/Header.svelte';
  import Footer from './lib/view/components/Footer.Component.svelte';
  import Chat from './lib/view/components/Chat.Component.svelte';
  import { chatStore } from './lib/viewmodel/store/chatStore.js';

  let userRole = 'buyer';

  onMount(() => {
    if (window.location.hash === '' || window.location.hash === '#') {
      push('/');
    }
  });
</script>

<div class="relative min-h-screen">
  <div id="app">
    <Header {userRole} />
    <main>
      <Router {routes} />
    </main>
    <Footer />
  </div>

  <Chat
    productId={$chatStore.selectedProductId}
    bind:isOpen={$chatStore.isChatOpen}
  />
</div>

<style>
  #app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    position: relative;
    z-index: 1;
  }

  #app main {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
</style>
