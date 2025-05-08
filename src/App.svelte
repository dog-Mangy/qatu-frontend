<script>
	import './../public/global.css';

	import Router from "svelte-spa-router";
	import routes from './view/routes/Router.js';

	import Header from './view/components/Header.svelte';
	import Footer from './view/components/Footer.Component.svelte';

	let userRole = 'buyer';
</script>

<div id="app">
	<Header {userRole} />
	<main>
		<Router {routes}/>
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
