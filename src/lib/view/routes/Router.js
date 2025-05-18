import Login from './Login.Router.svelte';
import Register from './Register.Router.svelte';
import MainPage from './MainPage.Router.svelte';
import Profile from './Profile.Router.svelte';
import Category from './Admin.Router.svelte';


const routes = {
  '/admin': Category,
  '/profile': Profile,
  '/login': Login,
  '/register': Register,
  '/': MainPage,
};

export default routes;
