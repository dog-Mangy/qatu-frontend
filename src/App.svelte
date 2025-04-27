<script>
	import { Router, Route } from 'svelte-routing';
	import { routes } from './view/routes/Router.js';
	import Header from './view/components/Header.svelte';
	import Footer from './view/components/Footer.svelte';
  
	export let url = '';
  
	// Simulamos el role. Luego podríamos traerlo de login real.
	let userRole = 'buyer'; // Cambia a 'buyer', 'seller', etc.
</script>

<main>
	<!-- Aquí ponemos el header y le pasamos el userRole -->
	<Header {userRole} />
  

	<Router {url}>
		{#each routes as { path, component }}
			<Route {path} {component} />
		{/each}
	</Router>

	<!-- Footer siempre abajo -->
	<Footer />
</main>
