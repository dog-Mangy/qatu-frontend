<script>
	export let containerId;
	export let images;

	let currentIndex = 0;

	$: displayedImage = {
		src: images[currentIndex],
		alt: `Banner Image ${currentIndex + 1}`,
	};

	function moveSlide(direction) {
		currentIndex = (currentIndex + direction + images.length) % images.length;
	}
</script>

<div id={containerId}>
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
		height: 400px;
		justify-content: center;
		margin: 0 auto;
		max-width: 1200px;
		position: relative;
		width: 50%;
	}

	.banner-image {
		height: 400px;
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
</style>
