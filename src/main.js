import { mount } from 'svelte';
import './app.css';
import App from './App.svelte';
import { initAuth0, authService } from './viewmodel/services/authService';

async function main() {
  await initAuth0();

  if (window.location.search.includes('code=')) {
    try {
      await authService.handleRedirectCallback();
      window.history.replaceState({}, document.title, window.location.pathname);
    } catch (error) {
      console.error('Error handling redirect callback:', error);
    }
  }

  return mount(App, {
    target: document.getElementById('app'),
  });
}

const app = main();

export default app;
