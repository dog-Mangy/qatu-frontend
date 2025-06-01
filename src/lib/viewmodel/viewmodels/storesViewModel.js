import { fetchAuth } from '../utils/fetchAuth.js';

export async function fetchStores() {
  const response = await fetchAuth('http://localhost:5028/api/stores');

  if (!response.ok) {
    throw new Error('Error loading the stores');
  }

  return await response.json();
}

export async function fetchStoresPaged({
  searchQuery = '',
  userId = null,
  sortBy = 'CreatedAt',
  ascending = true,
  page = 1,
  pageSize = 10
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

  const response = await fetchAuth(`http://localhost:5028/api/Stores/paged?${params.toString()}`);

  const data = await response.json();
  
  return {
    items: data.items,
    page: data.page,
    totalPages: data.nPages,
    totalElements: data.nElements
  };
}

export async function createStore(newStoreData) {
  const response = await fetchAuth('http://localhost:5028/api/Stores', {
    method: 'POST',
    body: JSON.stringify(newStoreData),
  });

  if (!response.ok) {
    throw new Error('Error creating the store');
  }

  return await response.json();
}

export async function updateStoreById(id, updatedData) {
  const response = await fetchAuth(`http://localhost:5028/api/Stores/${id}`, {
    method: 'PUT',
    body: JSON.stringify(updatedData),
  });

  if (!response.ok) {
    throw new Error('Error actualizando tienda');
  }

  return await response.json();
}

export async function deleteStoreById(id) {
  const response = await fetchAuth(`http://localhost:5028/api/Stores/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Error al eliminar la tienda');
  }
}