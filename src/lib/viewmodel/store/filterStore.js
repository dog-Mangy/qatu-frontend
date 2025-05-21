import { writable } from 'svelte/store';

const persistedFilters = writable(
  JSON.parse(localStorage.getItem('filters')) || {
    searchQuery: '',
    category: '',
    minPrice: '',
    maxPrice: '10000',
    minRating: 0,
    maxRating: 0,
    sortBy: 'Name',
    ascending: true,
  }
);

persistedFilters.subscribe(value => {
  localStorage.setItem('filters', JSON.stringify(value));
});

export const filters = persistedFilters;
