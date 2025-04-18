<script>
    import FormInput from './FormInput.Component.svelte';
    import { authViewModel } from '../../viewmodel/viewmodels/authViewModel';
    import { navigate } from 'svelte-routing';

	let email = '';
	let password = '';

	let error = '';
	let success = '';

	async function handleLogin(event) {
		event.preventDefault();
        ({ error, success } = await authViewModel.login({
			email,
			password,
		}));
    }

    function goToRegister() {
		navigate('/register');
	}
</script>

<div class="center-container">
	<div class="form-box">
		<h2>Log In</h2>

		{#if error}
			<p class="error-message">{error}</p>
		{/if}
		{#if success}
			<p class="success-message">{success}</p>
		{/if}

		<form on:submit={handleLogin}>
			<FormInput
				id="email"
				type="email"
				placeholder="Email"
				bind:value={email}
				required
			/>
			<FormInput
				id="password"
				type="password"
				placeholder="Password"
				bind:value={password}
				required
			/>
			<button type="submit">Log In</button>
		</form>

		<p>
			<a href="/forgotPassword">Forgot Password?</a>
		</p>

		<p>
			Still don't have an account?
			<button type="button" on:click={goToRegister}>Register</button>
		</p>

	</div>
</div>
