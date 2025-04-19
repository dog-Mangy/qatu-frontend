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

<style>
    a {
        color: aqua
    }

    h2 {
	color: white;
	text-align: center;
    }

    p {
        color: white;
        text-align: center;
    }

    .center-container {
        display: flex;
        justify-content: center;
	    align-items: center;
		min-height: 100vh;
	}

    .form-box {
		background: #1a0c46;
		border-radius: 50px;
		justify-items: center;
		margin: 1rem;
		max-width: 300px;
		padding: 0.5rem;
		width: 100%;
	}

    .success-message {
		background-color: #e8f5e9;
		border-radius: 8px;
		border: 1px solid #4caf50;
		color: #4caf50;
		margin-bottom: 1rem;
		padding: 0.5rem;
        text-align: center;
	}

    .error-message {
		background-color: #ffebee;
		border-radius: 8px;
		border: 1px solid #f44336;
		color: #f44336;
		margin-bottom: 1rem;
		padding: 0.5rem;
        text-align: center;
	}

	form {
		justify-items: center;
	}

    @media screen and (max-width: 720px) {
		.form-box {
			max-width: 270px;
		}
	}

	@media screen and (max-width: 360px) {
		.form-box {
			max-width: 250px;
			min-width: 180px;
		}
	}
</style>