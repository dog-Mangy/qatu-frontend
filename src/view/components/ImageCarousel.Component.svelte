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
	.carousel-container {
		align-items: center;
		display: flex;
		justify-content: center;
		position: relative;
		min-height: 500px;
		width: 60%;
		min-width: 280px;
		margin: 0 auto;
	}

	.carousel-section {
		display: flex;
		height: 400px;
		width: 80%;
	}

	.carousel-section img {
		flex-grow: 1;
		object-fit: cover;
		opacity: 0.8;
		transition: 0.5s ease;
		width: 0px;
	}

	.carousel-section img:hover {
		cursor: crosshair;
		filter: contrast(120%);
		opacity: 1;
		transform: scale(1.3);
		width: 20%;
		z-index: 9999;
	}

	.carousel-section img.hidden {
		display: none;
	}

	.carousel-btn {
		background: rgba(0, 0, 0, 0.5);
		border-radius: 5px;
		border: none;
		color: white;
		cursor: pointer;
		font-size: 18px;
		position: absolute;
	}

	.carousel-btn.prev {
		left: 10px;
	}

	.carousel-btn.next {
		right: 10px;
	}

	.carousel-btn:hover {
		background: rgba(0, 0, 0, 0.8);
	}

	@media (max-width: 720px) {
		.carousel-container {
			width: 90%;
		}
	}

	@media (max-width: 360px) {
		.carousel-container {
			min-height: 350px;
		}
		.carousel-section {
			height: 350px;
		}
		.carousel-section img:hover {
			transform: scale(1);
		}
	}
</style>
