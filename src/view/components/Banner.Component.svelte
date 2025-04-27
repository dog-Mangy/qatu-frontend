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
