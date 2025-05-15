import { userStore } from '../store/userStore.js';
import { createAuth0Client } from '@auth0/auth0-spa-js';

let minSize = 6;
let auth0 = null;

export async function initAuth0() {
  auth0 = await createAuth0Client({
    domain: 'dev-a8y38ts0ji0zxod3.us.auth0.com',
    clientId: 'RgvN5zdugNVUiVxjSuv1p7h7R7Tyzbxz',
    audience: 'https://qatu.api',
    cacheLocation: 'localstorage',
    useRefreshTokens: true,
    redirect_uri: window.location.origin,
  });
}

export const authService = {
  loginWithRedirect: async () => {
    await auth0.loginWithRedirect({
      authorizationParams: {
        redirect_uri: window.location.origin,
      },
    });
  },

  loginWithPopup: async () => {
    await auth0.loginWithPopup();
    return await auth0.getUser();
  },

  handleRedirectCallback: async () => {
    const result = await auth0.handleRedirectCallback();
    return result;
  },

  getUser: async () => {
    return await auth0.getUser();
  },

  getToken: async () => {
    return await auth0.getTokenSilently();
  },

  logout: () => {
    auth0.logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  },

  register: async user => {
    if (
      !user.name ||
      !user.lastName ||
      !user.email ||
      !user.identificationDocument ||
      !user.phoneNumber ||
      !user.password ||
      !user.confirmPassword
    ) {
      throw new Error('All fields are required');
    }

    if (!/\S+@\S+\.\S+/.test(user.email)) {
      throw new Error('Invalid email format');
    }

    if (user.password.length < minSize) {
      throw new Error('Password must be at least ' + minSize + ' characters');
    }

    if (user.password !== user.confirmPassword) {
      throw new Error('Passwords do not match');
    }

    await userStore.register(user);
  },

  login: async user => {
    if (!user.email || !user.password) {
      throw new Error('All fields are required');
    }

    if (!/\S+@\S+\.\S+/.test(user.email)) {
      throw new Error('Invalid email format');
    }

    if (user.password.length < minSize) {
      throw new Error('Password must be at least ' + minSize + ' characters');
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const foundUser = users.find(
      u => u.email === user.email && u.password === user.password
    );

    if (!foundUser) {
      throw new Error('Invalid email or password');
    }
  },
};
