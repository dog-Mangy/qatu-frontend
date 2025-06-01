import { fetchAuth } from '../utils/fetchAuth.js';

export async function createProduct(productData) {
  const response = await fetchAuth('http://localhost:5028/api/products', {
    method: 'POST',
    body: JSON.stringify(productData),
  });

  if (!response.ok) {
    throw new Error('Error al crear producto');
  }

  return await response.json();
}