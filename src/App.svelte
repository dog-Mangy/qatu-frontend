<script>
  import './../public/global.css'

	import { Router, Route } from 'svelte-routing';
	import { routes } from './view/routes/Router.js';

	export let url = '';
</script>

<main>
	<Router {url}>
		{#each routes as { path, component }}
			<Route {path} {component} />
		{/each}
	</Router>
</main>
