import Home from './Home.svelte';
import Login from './Login.Router.svelte';
import Register from './Register.Router.svelte';
import MainPage from './MainPage.Router.svelte'

export const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/mainpage', component: MainPage },
];
