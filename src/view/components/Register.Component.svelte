<script>
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
		<input placeholder="Name" bind:value={name} required />
		<input placeholder="Last Name" bind:value={lastName} required />
		<input type="email" placeholder="Email" bind:value={email} required />
		<input
			type="text"
			placeholder="Identification Document"
			bind:value={identificationDocument}
			required
		/>
		<input
			type="tel"
			placeholder="Phone Number"
			bind:value={phoneNumber}
			required
		/>
		<input
			type="password"
			placeholder="Password"
			bind:value={password}
			required
		/>
		<input
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
