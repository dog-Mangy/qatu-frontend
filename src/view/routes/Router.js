import Home from './Home.svelte';
import Login from './Login.svelte';
import Register from './Register.svelte';

export const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
];
