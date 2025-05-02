<script>
	import './../public/global.css';

	import { Router, Route } from 'svelte-routing';
	import { routes } from './view/routes/Router.js';

	import Header from './view/components/Header.svelte';
	import Footer from './view/components/Footer.Component.svelte';

	export let url = '';
	let userRole = 'buyer';
</script>

<div id="app">
	<Header {userRole} />

	<main>
		<Router {url}>
			{#each routes as { path, component }}
				<Route {path} {component} />
			{/each}
		</Router>
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
