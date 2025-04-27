<script>
	import { onMount } from 'svelte';

	export let containerId;
	export let images;

	let currentIndex = 0;
	let autoSlideInterval;
	const slideDuration = 5000;

	$: displayedImage = {
		src: images[currentIndex],
		alt: `Banner Image ${currentIndex + 1}`,
	};

	function moveSlide(direction) {
		currentIndex = (currentIndex + direction + images.length) % images.length;
	}

	function startAutoSlide() {
		stopAutoSlide();
		autoSlideInterval = setInterval(() => {
			moveSlide(1);
		}, slideDuration);
	}

	function stopAutoSlide() {
		if (autoSlideInterval) {
			clearInterval(autoSlideInterval);
		}
	}

	onMount(() => {
		startAutoSlide();
		return () => stopAutoSlide();
	});
</script>

<div
	id={containerId}
	on:mouseenter={stopAutoSlide}
	on:mouseleave={startAutoSlide}
>
	<div class="banner-container">
		<button class="banner-btn prev" on:click={() => moveSlide(-1)}>❮</button>
		<img
			src={displayedImage.src}
			alt={displayedImage.alt}
			class="banner-image"
		/>
		<button class="banner-btn next" on:click={() => moveSlide(1)}>❯</button>
	</div>
</div>

<style>
	.banner-container {
		align-items: center;
		display: flex;
		height: 300px;
		justify-content: center;
		margin: 0 auto;
		max-width: 500px;
		position: relative;
	}

	.banner-image {
		height: 300px;
		object-fit: cover;
		width: 100%;
	}

	.banner-btn {
		background: rgba(0, 0, 0, 0.5);
		border-radius: 5px;
		border: none;
		color: white;
		cursor: pointer;
		font-size: 20px;
		position: absolute;
	}

	.banner-btn.prev {
		left: 0px;
	}

	.banner-btn.next {
		right: 0px;
	}

	.banner-btn:hover {
		background: rgba(0, 0, 0, 0.8);
	}

	@media (max-width: 760px) {
		.banner-container {
			height: 250px;
			max-width: 400px;
		}
		.banner-image {
			height: 250px;
		}
	}

	@media (max-width: 390px) {
		.banner-container {
			height: 200px;
			max-width: 340px;
			min-width: 300px;
		}
		.banner-image {
			height: 200px;
			min-width: 300px;
		}
	}
</style>
