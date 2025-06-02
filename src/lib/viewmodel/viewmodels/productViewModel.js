import { fetchAuth } from '../utils/fetchAuth.js';

export async function getProducts({
  category = '',
  minPrice = null,
  maxPrice = null,
  minRating = null,
  maxRating = null,
  searchQuery = '',
  sortBy = 'CreatedAt',
  ascending = true,
  page = 1,
  pageSize = 8,
} = {}) {
  const params = new URLSearchParams();
  if (category) params.set('category', category);
  if (minPrice !== null) params.set('minPrice', minPrice.toString());
  if (maxPrice !== null) params.set('maxPrice', maxPrice.toString());
  if (minRating !== null) params.set('minRating', minRating.toString());
  if (maxRating !== null) params.set('maxRating', maxRating.toString());
  if (searchQuery) params.set('searchQuery', searchQuery);
  params.set('sortBy', sortBy);
  params.set('ascending', ascending.toString());
  params.set('page', page.toString());
  params.set('pageSize', pageSize.toString());

  try {
    const response = await fetch(
      `http://localhost:5028/api/Products?${params.toString()}`
    );

    if (!response.ok) {
      const text = await response.text();
      throw new Error(
        `Error fetching products: ${response.status} - ${text.slice(0, 100)}...`
      );
    }

    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text();
      throw new Error(
        `Expected JSON, got ${contentType || 'no content-type'}: ${text.slice(0, 100)}...`
      );
    }

    const data = await response.json();

    return {
      products: data.items || [],
      page: data.page || 1,
      totalPages: data.nPages || 1,
      totalElements: data.nElements || 0,
    };
  } catch (error) {
    console.error('getProducts error:', error);
    throw new Error(`Failed to fetch products: ${error.message}`);
  }
}

export async function getProductsByStoreId(
  storeId,
  {
    category = null,
    minPrice = null,
    maxPrice = null,
    minRating = null,
    maxRating = null,
    searchQuery = '',
    sortBy = 'CreatedAt',
    ascending = true,
    page = 1,
    pageSize = 10,
  } = {}
) {
  const params = new URLSearchParams();
  if (category) params.append('category', category);
  if (minPrice) params.append('minPrice', minPrice);
  if (maxPrice) params.append('maxPrice', maxPrice);
  if (minRating) params.append('minRating', minRating);
  if (maxRating) params.append('maxRating', maxRating);
  if (searchQuery) params.append('searchQuery', searchQuery);

  params.append('sortBy', sortBy);
  // @ts-ignore
  params.append('ascending', ascending);
  // @ts-ignore
  params.append('page', page);
  // @ts-ignore
  params.append('pageSize', pageSize);

  const response = await fetchAuth(
    `http://localhost:5028/api/stores/${storeId}/products?${params.toString()}`
  );
  if (!response.ok) {
    throw new Error('Error obteniendo los productos de la tienda');
  }

  const data = await response.json();

  return {
    items: data.items,
    page: data.page,
    totalPages: data.nPages,
    totalElements: data.nElements,
  };
}

export async function getProductById(id) {
  const response = await fetchAuth(`http://localhost:5028/api/products/${id}`);

  if (!response.ok) {
    throw new Error('Error obteniendo el producto');
  }

  return await response.json();
}

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

export async function createMultipleProducts(productsArray) {
  const response = await fetchAuth('http://localhost:5028/api/products/bulk', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ products: productsArray }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text);
  }

  return await response.json();
}

export async function updateProduct(id, productData) {
  const response = await fetchAuth(`http://localhost:5028/api/products/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(productData),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text);
  }

  return response.status === 204 ? null : await response.json();
}

export async function updateProductPrice(priceData) {
  const response = await fetchAuth(
    'http://localhost:5028/api/products/update-price',
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(priceData),
    }
  );

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text);
  }

  return response.status === 204 ? null : await response.json();
}

export async function updateProductStock(stockData) {
  const response = await fetchAuth(
    'http://localhost:5028/api/products/update-stock',
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(stockData),
    }
  );

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text);
  }

  return response.status === 204 ? null : await response.json();
}

export async function deleteProduct(id) {
  const response = await fetchAuth(`http://localhost:5028/api/products/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text);
  }

  return response.status === 204 ? null : await response.json();
}
