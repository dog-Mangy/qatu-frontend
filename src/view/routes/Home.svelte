<script>
	import ProgressIndicator from '../components/ProgressIndicator.Component.svelte';
	import ImageCarousel from '../components/ImageCarousel.Component.svelte';
  import ProductsList from '../components/ProductsList.Component.svelte';

	const artImages = [
		'https://images.pexels.com/photos/30028610/pexels-photo-30028610/free-photo-of-constelacion-de-orion.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
		'https://images.pexels.com/photos/30616133/pexels-photo-30616133/free-photo-of-nebulosa-espacial-vibrante-con-fondo-de-campo-estelar.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
		'https://images.pexels.com/photos/18131771/pexels-photo-18131771/free-photo-of-espacio-galaxy-galaxia-via-lactea.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
		'https://images.pexels.com/photos/544268/pexels-photo-544268.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
		'https://images.pexels.com/photos/1564312/nature-milky-way-stars-galaxy-1564312.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
		'https://images.pexels.com/photos/937980/pexels-photo-937980.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
		'https://images.pexels.com/photos/1723637/pexels-photo-1723637/free-photo-of-aurora-boreal.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
		'https://images.pexels.com/photos/1906658/pexels-photo-1906658/free-photo-of-cielo-estrellado-en-la-noche.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
	];

  const productList = [
    {
      id: 1,
      name: "Constellation Canvas",
      price: 49.99,
      description: "Orion constellation canvas.",
      image: artImages[0]
    },
    {
      id: 2,
      name: "Vibrant Nebula Poster",
      price: 29.99,
      description: "Nebula poster.",
      image: artImages[1]
    },
    {
      id: 3,
      name: "Milky Way Photograph",
      price: 39.99,
      description: "Photograph of our galaxy.",
      image: artImages[2]
    },
    {
      id: 4,
      name: "Space Horizon Art",
      price: 34.99,
      description: "Space artwork.",
      image: artImages[3]
    },
    {
      id: 5,
      name: "Night Sky Canvas",
      price: 44.99,
      description: "Night Sky Canvas.",
      image: artImages[4]
    },
    {
      id: 6,
      name: "Mountain Stars Poster",
      price: 27.99,
      description: "Mountains POster",
      image: artImages[5]
    },
    {
      id: 7,
      name: "Aurora Borealis Print",
      price: 32.99,
      description: "Print of Aurora Borealis.",
      image: artImages[6]
    },
    {
      id: 8,
      name: "Starry Night Landscape",
      price: 36.99,
      description: "Poster.",
      image: artImages[7]
    },
  ];
</script>

<h1>Progress Indicator Examples</h1>

<h2>Basic Progress Bar</h2>
<ProgressIndicator value={65} />

<h2>Custom Styled Progress Bar</h2>
<ProgressIndicator
	value={60}
	barColour="blue"
	height="30px"
	width="500px"
	backgroundColour="#e0e0e0"
/>

<h1>Example Image Carousel</h1>

<h2>Art Gallery</h2>
<ImageCarousel containerId="artGallery" images={artImages} imagesToShow={5} />

<ProductsList products={productList} />