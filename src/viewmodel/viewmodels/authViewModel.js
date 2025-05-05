import { authService } from '../services/authService.js';
import { navigate } from 'svelte-routing';

let timeDelay = 2000;

export const authViewModel = {
	register: async (userData) => {
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
				navigate('/login', { replace: true });
			}, timeDelay);
		} catch (err) {
			error = err.message || 'Registration failed';
		}

		return { error, success };
	},

	login: async (userData) => {
		let error = '';
		let success = '';

		try {
			await authService.login(userData);
			success = 'Login successful! Redirecting to Home Page';

			userData.email = '';
			userData.password = '';

			setTimeout(() => {
				navigate('/', { replace: true });
			}, timeDelay);
		} catch (err) {
			error = err.message || 'Login failed';
		}

		return { error, success };
	},
	auth0Login: async () => {
		try {
			await authService.loginWithRedirect();
		}
		catch (err) {
			console.error('Social login failed', err);
		}
	},
	auth0Logout: async () => {
		try {
			await authService.logout();
		}
		catch (err) {
			console.error('Social logout failed', err);
		}
	}
};
