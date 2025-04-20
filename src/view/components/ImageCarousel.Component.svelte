<script>
	export let containerId;
	export let images;
	export let imagesToShow = 5;

	let currentIndex = 0;
	let defaultImagesToShow = imagesToShow;
	let visibleImagesToShow = defaultImagesToShow;

	function moveSlide(direction) {
		currentIndex = (currentIndex + direction + images.length) % images.length;
	}
</script>

<div id={containerId}>
	<div class="carousel-container">
		<button class="carousel-btn prev" on:click={() => moveSlide(-1)}>❮</button>
		<section class="carousel-section">
			{#each images as src, index}
				<img
					{src}
					alt="Imagen {index + 1}"
					class="carousel-image"
					class:active={index >= 0 && index < visibleImagesToShow}
					class:hidden={index < 0 || index >= visibleImagesToShow}
				/>
			{/each}
		</section>
		<button class="carousel-btn next" on:click={() => moveSlide(1)}>❯</button>
	</div>
</div>

<style>
</style>
