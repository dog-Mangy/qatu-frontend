import { fetchAuth } from '../utils/fetchAuth.js';

export async function fetchCategories() {
  const response = await fetch('http://localhost:5028/api/categories');

  if (!response.ok) {
    throw new Error('Error al cargar las categorías');
  }

  const data = await response.json();
  return data.map(cat => ({
    id: cat.id,
    name: cat.name,
    image: cat.imageUrl || 'https://via.placeholder.com/100',
  }));
}

export async function createCategory(newCategoryData) {
  const response = await fetchAuth('http://localhost:5028/api/categories', {
    method: 'POST',
    body: JSON.stringify(newCategoryData),
  });

  if (!response.ok) {
    throw new Error('Error creando categoría');
  }

  return await response.json();
}

export async function updateCategoryById(id, updatedData) {
  const response = await fetchAuth(
    `http://localhost:5028/api/categories/${id}`,
    {
      method: 'PUT',
      body: JSON.stringify(updatedData),
    }
  );

  if (!response.ok) {
    throw new Error('Error actualizando categoría');
  }

  return await response.json();
}

export async function deleteCategoryById(id) {
  const response = await fetchAuth(
    `http://localhost:5028/api/categories/${id}`,
    {
      method: 'DELETE',
    }
  );

  if (!response.ok) {
    throw new Error('Error al eliminar la categoría');
  }
}
