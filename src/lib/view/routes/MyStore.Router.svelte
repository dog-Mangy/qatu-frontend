<script>
  import ProductsList from '../components/ProductsList.Component.svelte';
  import StoreRatingInfo from '../components/StoreRatingInfo.svelte';
  const images = [
    'https://images.pexels.com/photos/30028610/pexels-photo-30028610/free-photo-of-constelacion-de-orion.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/30616133/pexels-photo-30616133/free-photo-of-nebulosa-espacial-vibrante-con-fondo-de-campo-estelar.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/18131771/pexels-photo-18131771/free-photo-of-espacio-galaxy-galaxia-via-lactea.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/544268/pexels-photo-544268.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/1564312/nature-milky-way-stars-galaxy-1564312.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/937980/pexels-photo-937980.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/1723637/pexels-photo-1723637.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/1906658/pexels-photo-1906658.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  ];

  const productList = [
    {
      id: 1,
      name: 'Constellation Canvas',
      price: 49.99,
      description: 'Orion constellation canvas.',
      image: images[0],
    },
    {
      id: 2,
      name: 'Vibrant Nebula Poster',
      price: 29.99,
      description: 'Nebula poster.',
      image: images[1],
    },
    {
      id: 3,
      name: 'Milky Way Photograph',
      price: 39.99,
      description: 'Photograph of our galaxy.',
      image: images[2],
    },
    {
      id: 4,
      name: 'Space Horizon Art',
      price: 34.99,
      description: 'Space artwork.',
      image: images[3],
    },
    {
      id: 5,
      name: 'Night Sky Canvas',
      price: 44.99,
      description: 'Night Sky Canvas.',
      image: images[4],
    },
    {
      id: 6,
      name: 'Mountain Stars Poster',
      price: 27.99,
      description: 'Mountains POster',
      image: images[5],
    },
    {
      id: 7,
      name: 'Aurora Borealis Print',
      price: 32.99,
      description: 'Print of Aurora Borealis.',
      image: images[6],
    },
    {
      id: 8,
      name: 'Starry Night Landscape',
      price: 36.99,
      description: 'Poster.',
      image: images[7],
    },
  ];

  const storeRating = {
    average: 4.23,
    totalRatings: 60,
    comments: [
      {
        id: 1,
        user: 'Juan Pérez',
        rating: 5,
        comment: 'Excelente calidad en todos los productos. Muy recomendado!',
        date: '2023-10-15'
      },
      {
        id: 2,
        user: 'María García',
        rating: 4,
        comment: 'Buen servicio, los productos llegaron a tiempo.',
        date: '2023-09-28'
      },
      {
        id: 3,
        user: 'Carlos López',
        rating: 3,
        comment: 'Algunos productos no coincidían exactamente con las fotos, pero en general bien.',
        date: '2023-09-10'
      },
      {
        id: 4,
        user: 'Ana Martínez',
        rating: 5,
        comment: 'Increíble atención al cliente y productos de primera calidad.',
        date: '2023-08-22'
      }
    ]
  };
</script>

<main>
  <ProductsList products={productList} isStoreView={true} />
  <StoreRatingInfo {storeRating} />
</main>