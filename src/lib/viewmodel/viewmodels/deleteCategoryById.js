export async function deleteCategoryById(id) {
  const response = await fetch(`http://localhost:5028/api/categories/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
      // Agrega Authorization aquí si lo necesitas más adelante
    }
  });

  if (!response.ok) {
    throw new Error('Error al eliminar la categoría');
  }
}
