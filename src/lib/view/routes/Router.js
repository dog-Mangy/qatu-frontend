import Login from './Login.Router.svelte';
import Register from './Register.Router.svelte';
import MainPage from './MainPage.Router.svelte';
import Profile from './Profile.Router.svelte';
import MyStore from './MyStore.Router.svelte';

const routes = {
  '/categories': Category,
  '/profile': Profile,
  '/login': Login,
  '/register': Register,
  '/': MainPage,
  '/mystore': MyStore
};

export default routes;
