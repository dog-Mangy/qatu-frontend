<script>
  import StoresComponent from '../components/Stores.Component.svelte';
  
  const stores = [
    {
      id: 1,
      name: "Galactic Art",
      description: "Arte espacial y decoración cósmica",
      createdAt: "2023-05-15"
    },
    {
      id: 2,
      name: "Cosmic Creations",
      description: "Posters y fotografías del universo",
      createdAt: "2023-06-20"
    },
    {
      id: 3,
      name: "Stellar Designs",
      description: "Diseños inspirados en las estrellas",
      createdAt: "2023-07-10"
    },
    {
      id: 4,
      name: "Nebula Store",
      description: "Productos únicos con temática espacial",
      createdAt: "2023-08-05"
    },
    {
      id: 5,
      name: "Astro Shop",
      description: "Todo para los amantes de la astronomía",
      createdAt: "2023-09-12"
    },
    {
      id: 6,
      name: "Orion Outpost",
      description: "Regalos y artículos coleccionables",
      createdAt: "2023-10-18"
    }
  ];
</script>

<main>
  <StoresComponent {stores} />
</main>