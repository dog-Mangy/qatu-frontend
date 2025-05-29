import Login from './Login.Router.svelte';
import Register from './Register.Router.svelte';
import MainPage from './MainPage.Router.svelte';
import Profile from './Profile.Router.svelte';
import Category from './Category.Router.svelte';
import ProductDetail from '../components/ProductDetail.Component.svelte';
import FormRequest from './FormRequest.svelte';
import MyStore from './MyStore.Router.svelte';

const routes = {
  '/categories': Category,
  '/profile': Profile,
  '/login': Login,
  '/register': Register,
  '/formrequest': FormRequest,
  '/': MainPage,
  '/store/:id_Store/product/:id': ProductDetail,
  '/mystore': MyStore
};

export default routes;
