import App from './App.svelte';
import { initAuth0, authService } from './viewmodel/services/authService';

async function initializeApp() {
  await initAuth0();
  
  if (window.location.search.includes('code=')) {
    try {
      await authService.handleRedirectCallback();
      window.history.replaceState({}, document.title, window.location.pathname);
    } catch (error) {
      console.error('Error handling redirect callback:', error);
    }
  }

  return new App({
    target: document.body,
    props: {
      name: 'world'
    }
  });
}

const app = initializeApp();
export default app;