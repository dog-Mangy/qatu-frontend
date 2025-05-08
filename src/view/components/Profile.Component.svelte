<script>
  import { onMount } from 'svelte';
  import { authViewModel } from '../../viewmodel/viewmodels/authViewModel'
  import { navigate } from 'svelte-routing';

  let user = null;
  let loading = true;

  onMount(async () => {
    try {
      user = await authViewModel.getUser();
    } catch (err) {
      console.error('Failed to load user:', err);
      navigate('/login');
    } finally {
      loading = false;
    }
  });

  function logout() {
    authViewModel.logout();
  }
</script>

<div class="center-container">
  <div class="account-box">
    {#if loading}
      <p>Loading account...</p>
    {:else if user}
      <h2>My Account</h2>
      <img src={user.picture} alt="Profile" class="profile-img" />
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <button on:click={logout}>Log Out</button>
    {:else}
      <p>User not logged in.</p>
    {/if}
  </div>
</div>

<style>
  .center-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    height: 100%;
  }

  .account-box {
    background: #1a0c46;
    color: white;
    border-radius: 30px;
    padding: 2rem;
    max-width: 350px;
    text-align: center;
  }

  .profile-img {
    border-radius: 50%;
    height: 80px;
    width: 80px;
    margin-bottom: 1rem;
  }

  button {
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
  }

  button:hover {
    background-color: #45a049;
  }
</style>
