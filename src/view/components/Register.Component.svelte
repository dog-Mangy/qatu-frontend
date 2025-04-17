<script>
	import FormInput from './FormInput.Component.svelte';

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
	}
</script>

<div>
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
