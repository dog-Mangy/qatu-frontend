<script>
	export let id;
	export let type = 'text';
	export let placeholder = '';
	export let value = '';
	export let required = false;
</script>

<div>
	{#if type === 'email'}
		<input
			{id}
			type="email"
			{placeholder}
			{required}
			bind:value
			class="email"
		/>
	{:else if type === 'password'}
		<input
			{id}
			type="password"
			{placeholder}
			{required}
			bind:value
			class="password"
		/>
	{:else if type === 'tel'}
		<input {id} type="tel" {placeholder} {required} bind:value class="tel" />
	{:else}
		<input {id} type="text" {placeholder} {required} bind:value class="text" />
	{/if}
</div>

<style>
	input {
		background: #11092a;
		color: white;
		text-align: center;
		border-color: white;
		border-radius: 8px;
	}

	input::placeholder {
		color: white;
	}
</style>
