import Login from './Login.Router.svelte';
import Register from './Register.Router.svelte';
import MainPage from './MainPage.Router.svelte';
import Profile from './Profile.Router.svelte';
import FormRequest from './FormRequest.svelte';

const routes = {
  '/profile': Profile,
  '/login': Login,
  '/register': Register,
  '/formrequest': FormRequest,
  '/': MainPage,
};

export default routes;
