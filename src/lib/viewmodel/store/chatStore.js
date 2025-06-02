import { writable } from 'svelte/store';

export const chatStore = writable({
  isChatOpen: false,
  selectedProductId: null,
});
