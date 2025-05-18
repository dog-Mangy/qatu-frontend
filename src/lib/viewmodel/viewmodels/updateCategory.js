// categoryViewModel.js
export async function updateCategoryById(id, updatedData) {
  const response = await fetch(`http://localhost:5028/api/categories/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedData),
  });

  if (!response.ok) {
    throw new Error('Error actualizando categoría');
  }

  return await response.json();
}
