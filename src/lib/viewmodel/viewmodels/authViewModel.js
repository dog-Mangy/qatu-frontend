import { push } from 'svelte-spa-router';
import { authService } from '../services/authService.js';

let timeDelay = 2000;
let alreadyRedirected = false;

export const authViewModel = {
  register: async userData => {
    let error = '';
    let success = '';

    try {
      await authService.register(userData);
      success = 'Registration successful! Redirecting to login...';

      Object.keys(userData).forEach(key => (userData[key] = ''));

      if (!alreadyRedirected) {
        alreadyRedirected = true;
        setTimeout(() => {
          push('/login');
        }, timeDelay);
      }
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

      if (!alreadyRedirected) {
        alreadyRedirected = true;
        setTimeout(() => {
          push('/');
        }, timeDelay);
      }
    } catch (err) {
      error = err.message || 'Login failed';
    }

    return { error, success };
  },
  auth0Login: async () => {
    try {
      await authService.loginWithPopup();
      const user = await authService.getUser();
      const result = await authService.saveUser(user);
      if (!result) {
        console.warn('No user returned from backend, logging out.');
        await authService.logout();
        throw new Error('Failed to save user data');
      }
      console.log('User logged in and saved:', result);
      push('/');
    } catch (err) {
      console.error('Social login failed', err.message || err);
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
  getToken: async () => {
    let token = null;
    try {
      token = await authService.getToken();
    } catch (err) {
      console.error('Failed to get token', err);
    }
    return token;
  },

  getUUID: async () => {
    let uuid = null;
    try {
      uuid = await authService.getUUID();
    } catch (err) {
      console.error('Failed to get UUID', err);
    }
    return uuid;
  },
};
