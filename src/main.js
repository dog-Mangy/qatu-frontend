import { mount } from 'svelte';
import './app.css';
import App from './App.svelte';
import { initAuth0, authService } from './lib/viewmodel/services/authService';
import { authViewModel } from './lib/viewmodel/viewmodels/authViewModel';
import { startInactivityWatcher } from './lib/viewmodel/utils/inactivityLogout';

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

  // Iniciar watcher de inactividad
  startInactivityWatcher(() => {
    authViewModel.logout();
    alert('Sesión cerrada por inactividad');
  });

  return mount(App, {
    target: document.getElementById('app'),
  });
}

const app = main();

export default app;
