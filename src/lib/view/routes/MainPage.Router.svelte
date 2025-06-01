<script>
  import Banner from './../components/Banner.Component.svelte';
  import ProductsList from '../components/ProductsList.Component.svelte';

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
      id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
      id_Store: 101,
      name: 'Constellation Canvas',
      price: 49.99,
      description: 'Orion constellation canvas.',
      image: images[0],
    },
    {
      id: 'b2c3d4e5-f6a7-8901-bcde-f23456789012',
      id_Store: 101,
      name: 'Vibrant Nebula Poster',
      price: 29.99,
      description: 'Nebula poster.',
      image: images[1],
    },
    {
      id: '30a8c927-9774-4057-9f6a-2c4158d2b2d3',
      id_Store: 102,
      name: 'Milky Way Photograph',
      price: 39.99,
      description: 'Photograph of our galaxy.',
      image: images[2],
    },
    {
      id: '377f3896-ed4d-4e68-ad30-02cc65e426b8',
      id_Store: 103,
      name: 'Space Horizon Art',
      price: 34.99,
      description: 'Space artwork.',
      image: images[3],
    },
    {
      id: '45726569-0a33-4ed1-9ce3-072324033594',
      id_Store: 104,
      name: 'Night Sky Canvas',
      price: 44.99,
      description: 'Night Sky Canvas.',
      image: images[4],
    },
    {
      id: '73e0fe7b-530b-4cc1-9ad0-a028f116b0a8',
      id_Store: 105,
      name: 'Mountain Stars Poster',
      price: 27.99,
      description: 'Mountains POster',
      image: images[5],
    },
    {
      id: '7a44753c-aa8c-480f-ade8-bcf20ab8a6ce',
      id_Store: 106,
      name: 'Aurora Borealis Print',
      price: 32.99,
      description: 'Print of Aurora Borealis.',
      image: images[6],
    },
    {
      id: '81461fab-579e-4b88-8406-8c66890f59a3',
      id_Store: 107,
      name: 'Starry Night Landscape',
      price: 36.99,
      description: 'Poster.',
      image: images[7],
    },
  ];
</script>

<main>
  <Banner containerId="my-banner" {images} />
  <ProductsList products={productList} />
</main>
