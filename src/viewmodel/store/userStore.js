import { writable } from 'svelte/store';

function createUserStore() {
	const { subscribe, update } = writable({
		users: JSON.parse(localStorage.getItem('users')) || [],
	});

	return {
		subscribe,
		register: (user) => {
			update((state) => {
				if (state.users.some((u) => u.email === user.email)) {
					throw new Error('Email already registered');
				}

				const newUser = {
					...user,
				};

				const updatedUsers = [...state.users, newUser];
				localStorage.setItem('users', JSON.stringify(updatedUsers));
				return { ...state, users: updatedUsers };
			});
		},
	};
}

export const userStore = createUserStore();
