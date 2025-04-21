import { userStore } from '../store/userStore.js';

let minSize = 6;

export const authService = {
	register: async (user) => {
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

	login: async (user) =>  {
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
		const foundUser = users.find(u => u.email === user.email && u.password === user.password);

		if (!foundUser) {
			throw new Error('Invalid email or password');
		}
	}
};
