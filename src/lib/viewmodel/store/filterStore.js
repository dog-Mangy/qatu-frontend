import { writable } from 'svelte/store';

const persistedFilters = writable(
  JSON.parse(localStorage.getItem('filters')) || {
    searchQuery: '',
    category: '',
    minPrice: '0',
    maxPrice: '1000',
    minRating: 0,
    maxRating: 1000,
    sortBy: 'CreatedAt',
    ascending: true,
    page: 1,
    pageSize: 8,
  }
);

persistedFilters.subscribe(value => {
  localStorage.setItem('filters', JSON.stringify(value));
});

export const filters = persistedFilters;
