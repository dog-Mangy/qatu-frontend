<script>
  import { authViewModel } from '../../viewmodel/viewmodels/authViewModel';

  let error = '';
  let success = '';

  async function handleAuth0Login() {
    await authViewModel.auth0Login();
    window.location.href = '/#';
    window.location.reload();
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

    <p>
      <button
        on:click={async () => {
          await handleAuth0Login();
        }}
      >
        Continue with Auth0
      </button>
    </p>

    <p>
      Still don't have an account?
      <a href="/#/register">Register</a>
    </p>
  </div>
</div>

<style>
  a {
    color: aqua;
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
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1;
    height: 100%;
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
