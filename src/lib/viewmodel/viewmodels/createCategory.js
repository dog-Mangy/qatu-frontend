// createCategory.js
export async function createCategory(newCategoryData) {
  const response = await fetch('http://localhost:5028/api/categories', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newCategoryData),
  });

  if (!response.ok) {
    throw new Error('Error creando categoría');
  }

  return await response.json();
}
