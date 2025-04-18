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
};
