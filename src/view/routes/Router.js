import Home from './Home.svelte';
import Login from './Login.svelte';
import Register from './Register.Router.svelte';

export const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
];
