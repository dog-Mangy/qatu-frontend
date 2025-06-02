import { fetchAuth } from '../utils/fetchAuth.js';

export async function getAllStores() {
  const response = await fetch('http://localhost:5028/api/stores');

  if (!response.ok) {
    throw new Error('Error obteniendo las tiendas');
  }

  return await response.json();
}

export async function getAllStoresPaged({
  searchQuery = '',
  userId = null,
  sortBy = 'CreatedAt',
  ascending = true,
  page = 1,
  pageSize = 10,
} = {}) {
  const params = new URLSearchParams();
  if (searchQuery) params.append('searchQuery', searchQuery);
  if (userId) params.append('userId', userId);
  params.append('sortBy', sortBy);
  // @ts-ignore
  params.append('ascending', ascending);
  // @ts-ignore
  params.append('page', page);
  // @ts-ignore
  params.append('pageSize', pageSize);

  const response = await fetch(
    `http://localhost:5028/api/Stores/paged?${params.toString()}`
  );

  const data = await response.json();

  return {
    items: data.items,
    page: data.page,
    totalPages: data.nPages,
    totalElements: data.nElements,
  };
}

export async function createStore({ UserId, Name, Description }) {
  const data = { UserId, Name, Description };

  const response = await fetchAuth('http://localhost:5028/api/stores', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text);
  }

  return await response.json();
}

export async function getStoresByUserId(userId) {
  const response = await fetchAuth(
    `http://localhost:5028/api/stores/user/${userId}`
  );
  if (!response.ok) {
    throw new Error('Error obteniendo las tiendas del usuario');
  }

  return await response.json();
}

export async function getStoreById(storeId) {
  const response = await fetch(`http://localhost:5028/api/stores/${storeId}`);

  if (!response.ok) {
    throw new Error('Error obteniendo la tienda');
  }

  return await response.json();
}
