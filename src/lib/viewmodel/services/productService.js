import { writable } from 'svelte/store';
import { getProducts } from '../viewmodels/productViewModel';

export const productStore = writable({
  products: [],
  isLoading: false,
  error: '',
  nElements: 0,
});

let debounceTimeout = null;

export function fetchProducts(filters) {
  if (debounceTimeout) {
    clearTimeout(debounceTimeout);
  }

  debounceTimeout = setTimeout(async () => {
    productStore.update(state => ({ ...state, isLoading: true, error: '' }));
    try {
      const response = await getProducts({
        searchQuery: filters.searchQuery || '',
        category:
          filters.category && filters.category !== 'All Categories'
            ? filters.category
            : null,
        minPrice: filters.minPrice ? parseFloat(filters.minPrice) : 0,
        maxPrice: filters.maxPrice ? parseFloat(filters.maxPrice) : 1000,
        minRating: filters.minRating ? parseFloat(filters.minRating) : 0,
        maxRating: filters.maxRating ? parseFloat(filters.maxRating) : 1000,
        sortBy: filters.sortBy || 'CreatedAt',
        ascending: filters.ascending !== undefined ? filters.ascending : true,
        page: filters.page || 1,
        pageSize: 8,
      });
      productStore.update(state => ({
        ...state,
        products: response.products || [],
        isLoading: false,
        nElements: response.totalElements || 0,
      }));
    } catch (err) {
      console.error('Error fetching products:', err);
      productStore.update(state => ({
        ...state,
        products: [],
        isLoading: false,
        error: 'No products found. Try adjusting the filters.',
        nElements: 0,
      }));
    }
  }, 5000);
}
