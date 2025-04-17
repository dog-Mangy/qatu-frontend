<script>
	import FormInput from './FormInput.Component.svelte';
	import { authViewModel } from '../../viewmodel/viewmodels/authViewModel.js';

	let name = '';
	let lastName = '';
	let email = '';
	let identificationDocument = '';
	let phoneNumber = '';
	let password = '';
	let confirmPassword = '';

	let error = '';
	let success = '';

	async function handleRegister(event) {
		event.preventDefault();
		({ error, success } = await authViewModel.register({
			name,
			lastName,
			email,
			identificationDocument,
			phoneNumber,
			password,
			confirmPassword,
		}));
	}
</script>

<div class="center-container">
	<div class="form-box">
		<h2>Register</h2>

		{#if error}
			<p>{error}</p>
		{/if}
		{#if success}
			<p>{success}</p>
		{/if}

		<form on:submit={handleRegister}>
			<FormInput id="name" placeholder="Name" bind:value={name} required />
			<FormInput
				id="lastName"
				placeholder="Last Name"
				bind:value={lastName}
				required
			/>
			<FormInput
				id="email"
				type="email"
				placeholder="Email"
				bind:value={email}
				required
			/>
			<FormInput
				id="identificationDocument"
				placeholder="Identification Document"
				bind:value={identificationDocument}
				required
			/>
			<FormInput
				id="phoneNumber"
				type="tel"
				placeholder="Phone Number"
				bind:value={phoneNumber}
				required
			/>
			<FormInput
				id="password"
				type="password"
				placeholder="Password"
				bind:value={password}
				required
			/>
			<FormInput
				id="confirmPassword"
				type="password"
				placeholder="Confirm Password"
				bind:value={confirmPassword}
				required
			/>
			<button type="submit">Register</button>
		</form>

		<p>
			Already have an account? <a href="/login">Login</a>
		</p>
	</div>
</div>

<style>
	h2,
	p {
		color: white;
	}

	.center-container {
		min-height: 100vh;
		justify-items: center;
		align-content: center;
	}

	.form-box {
		background: #1a0c46;
		border-radius: 50px;
		justify-items: center;
		max-width: 300px;
		padding: 2rem;
		width: 100%;
	}

	form {
		justify-items: center;
	}

	@media screen and (max-width: 720px) {
		.form-box {
			max-width: 270px;
			padding: 1rem;
		}
	}

	@media screen and (max-width: 360px) {
		.form-box {
			min-width: 70%;
			padding: 0.5rem;
		}
	}
</style>
