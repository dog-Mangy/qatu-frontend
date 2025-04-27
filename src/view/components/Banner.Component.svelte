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
