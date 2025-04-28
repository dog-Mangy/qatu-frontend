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

	function goToSlide(index) {
		currentIndex = index;
	}

	function handleKeyPress(event, direction) {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			moveSlide(direction);
		}
	}

	function handleDotKeyPress(event, index) {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			goToSlide(index);
		}
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
		<button
			class="banner-btn prev"
			on:click={() => moveSlide(-1)}
			on:keypress={(e) => handleKeyPress(e, -1)}
		>
			❮
		</button>
		<img
			src={displayedImage.src}
			alt={displayedImage.alt}
			class="banner-image"
		/>
		<button
			class="banner-btn next"
			on:click={() => moveSlide(1)}
			on:keypress={(e) => handleKeyPress(e, 1)}
		>
			❯
		</button>
		<div class="dots-container">
			{#each images as _, index}
				<span
					class="dot"
					class:active={index === currentIndex}
					on:click={() => goToSlide(index)}
					on:keypress={(e) => handleDotKeyPress(e, index)}
					role="button"
					tabindex="0"
				></span>
			{/each}
		</div>
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
		transition: opacity 0.5s ease-in-out;
	}

	.banner-btn {
		background: transparent;
		border: none;
		color: transparent;
		cursor: pointer;
		height: 100%;
		position: absolute;
		width: 50px;
	}

	.banner-btn.prev {
		left: 0px;
	}

	.banner-btn.next {
		right: 0px;
	}

	.banner-btn:hover,
	.banner-btn:focus,
	.banner-btn:active {
		background: transparent;
		color: transparent;
		cursor: pointer;
	}

	.dots-container {
		position: absolute;
		bottom: 10px;
		width: 100%;
		display: flex;
		justify-content: center;
		gap: 8px;
	}

	.dot {
		width: 10px;
		height: 10px;
		background: rgba(255, 255, 255, 0.5);
		border-radius: 50%;
		cursor: pointer;
	}

	.dot.active {
		background: white;
	}

	@media (max-width: 760px) {
		.banner-container {
			height: 250px;
			max-width: 400px;
		}
		.banner-image {
			height: 250px;
		}
		.banner-btn {
			width: 40px;
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
		.banner-btn {
			width: 30px;
		}
	}
</style>
