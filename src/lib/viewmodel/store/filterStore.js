import { writable } from 'svelte/store';

export const filters = writable({
  searchQuery: '',
  category: '',
  minPrice: '',
  maxPrice: '',
  minRating: '',
  maxRating: '',
  sortBy: 'CreatedAt',
  ascending: true,
  page: 1,
  pageSize: 8,
});
