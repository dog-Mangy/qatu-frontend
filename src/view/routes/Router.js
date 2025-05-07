import Login from './Login.Router.svelte';
import Register from './Register.Router.svelte';
import MainPage from './MainPage.Router.svelte'
import Profile from './Profile.Router.svelte';

export const routes = [
  { path: '/profile', component: Profile}, 
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/', component: MainPage },
];
