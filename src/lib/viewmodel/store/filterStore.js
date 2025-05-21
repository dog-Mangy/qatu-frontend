import { writable } from 'svelte/store';

export const filters = writable({
  searchQuery: '',
  category: '',
  minPrice: '',
  maxPrice: '10000',
  minRating: 0,
  maxRating: 5,
  sortBy: 'Name',
  ascending: true,
});
