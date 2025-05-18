// src/viewmodel/categoryViewModel.js

export async function fetchCategories() {
  const response = await fetch('http://localhost:5028/api/categories', {
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error('Error al cargar las categorías');
  }

  const data = await response.json();
  return data.map(cat => ({
    id: cat.id,
    name: cat.name,
    image: cat.imageUrl || 'https://via.placeholder.com/100'
  }));
}
