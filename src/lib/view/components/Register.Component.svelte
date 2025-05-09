<script>
  import FormInput from "./FormInput.Component.svelte";
  import { authViewModel } from "../../viewmodel/viewmodels/authViewModel.js";

  let name = "";
  let lastName = "";
  let email = "";
  let identificationDocument = "";
  let phoneNumber = "";
  let password = "";
  let confirmPassword = "";

  let error = "";
  let success = "";

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
      <p class="error-message">{error}</p>
    {/if}
    {#if success}
      <p class="success-message">{success}</p>
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
      Already have an account? <a href="/#/login">Login</a>
    </p>
  </div>
</div>

<style>
  a {
    color: aqua;
  }

  h2,
  p {
    color: white;
  }

  .center-container {
    align-items: center;
    display: flex;
    flex-direction: column;
    flex: 1;
    justify-content: center;
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

  form {
    justify-items: center;
  }

  .success-message {
    background-color: #e8f5e9;
    border-radius: 8px;
    border: 1px solid #4caf50;
    color: #4caf50;
    margin-bottom: 1rem;
    padding: 0.5rem;
  }

  .error-message {
    background-color: #ffebee;
    border-radius: 8px;
    border: 1px solid #f44336;
    color: #f44336;
    margin-bottom: 1rem;
    padding: 0.5rem;
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
