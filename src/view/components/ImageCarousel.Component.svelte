<script>
	export let containerId;
	export let images;
	export let imagesToShow = 5;

	let currentIndex = 0;
	let defaultImagesToShow = imagesToShow;
	let visibleImagesToShow = defaultImagesToShow;
</script>

<div id={containerId}>
	<div class="carousel-container">
		<button class="carousel-btn prev">❮</button>
		<section class="carousel-section">
			{#each images as src, index}
				<img {src} alt="Imagen {index + 1}" class="carousel-image" />
			{/each}
		</section>
		<button class="carousel-btn next">❯</button>
	</div>
</div>

<style>
</style>
