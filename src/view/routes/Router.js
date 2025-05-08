import Login from './Login.Router.svelte';
import Register from './Register.Router.svelte';
import MainPage from './MainPage.Router.svelte'
import Profile from './Profile.Router.svelte';

const routes = {
  '/profile': Profile, 
  '/login': Login,
  '/register': Register,
  '/': MainPage,
}

export default routes;
