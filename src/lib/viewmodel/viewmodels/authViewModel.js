import { push } from 'svelte-spa-router';
import { authService } from '../services/authService.js';

let timeDelay = 2000;

export const authViewModel = {
  register: async userData => {
    let error = '';
    let success = '';

    try {
      await authService.register(userData);
      success = 'Registration successful! Redirecting to login...';
      userData.name = '';
      userData.lastName = '';
      userData.email = '';
      userData.identificationDocument = '';
      userData.phoneNumber = '';
      userData.password = '';
      userData.confirmPassword = '';
      setTimeout(() => {
        push('/login');
      }, timeDelay);
    } catch (err) {
      error = err.message || 'Registration failed';
    }

    return { error, success };
  },

  login: async userData => {
    let error = '';
    let success = '';

    try {
      await authService.login(userData);
      success = 'Login successful! Redirecting to Home Page';

      userData.email = '';
      userData.password = '';

      setTimeout(() => {
        push('/');
      }, timeDelay);
    } catch (err) {
      error = err.message || 'Login failed';
    }

    return { error, success };
  },
  auth0Login: async () => {
    try {
      await authService.loginWithRedirect();
    } catch (err) {
      console.error('Social login failed', err);
    }
  },
  auth0Logout: async () => {
    try {
      await authService.logout();
    } catch (err) {
      console.error('Social logout failed', err);
    }
  },
  getUser: async () => {
    let user = null;
    try {
      user = await authService.getUser();
    } catch (err) {
      console.error('Failed to get user', err);
    }
    return user;
  },
  logout: async () => {
    try {
      await authService.logout();
      push('/login');
    } catch (err) {
      console.error('Logout failed', err);
    }
  },
};
