<script>
	import Header from '../components/Header.svelte';
	import Footer from '../components/Footer.Component.svelte';

	// We simulate the role. We could then bring it in from the real login.
	let userRole = 'buyer'; // Change it to 'buyer', 'seller', etc.
</script>

<!-- Here we put the header and pass it the userRole -->
<Header {userRole} />

<main>
	<h1>MainPage</h1>

	<a href="/mainPage">MainPage</a>
</main>

<!-- Instances the Footer here -->
<Footer />
