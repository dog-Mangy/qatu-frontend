import Login from './Login.Router.svelte';
import Register from './Register.Router.svelte';
import MainPage from './MainPage.Router.svelte';
import Profile from './Profile.Router.svelte';
import Category from './Category.Router.svelte';
import ProductDetail from '../components/ProductDetail.Component.svelte';
import FormRequest from './FormRequest.svelte';
import MyStore from './MyStore.Router.svelte';
import Stores from './Stores.Router.svelte';
import AdminRequest from './AdminRequest.Router.svelte';
import StoreView from './StoreView.Router.svelte';
import ProductCreate from '../components/ProductCreate.Component.svelte';

const routes = {
  '/categories': Category,
  '/profile': Profile,
  '/login': Login,
  '/register': Register,
  '/formrequest': FormRequest,
  '/': MainPage,
  '/store/:id_Store/product/:id': ProductDetail,
  '/mystore': MyStore,
  '/stores': Stores,
  '/storesAdmin': StoreView,
  '/requests' : AdminRequest,
  '/mystore/create-product': ProductCreate
};

export default routes;
