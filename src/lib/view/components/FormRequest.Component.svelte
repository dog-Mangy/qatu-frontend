<script>
  import { createRequest } from '../../viewmodel/viewmodels/requestViewModel.js';
  import { authViewModel } from '../../viewmodel/viewmodels/authViewModel';

  let storeName = '';
  let storeDescription = '';
  let description = '';

  async function handleSubmit() {
    try {
      const userId = await authViewModel.getUUID();
      const requestData = {
        userId,
        storeName,
        storeDescription,
        description,
      };

      const response = await createRequest(requestData);

      alert(`Request submitted successfully. ID: ${response.id}`);
      storeName = '';
      storeDescription = '';
      description = '';
    } catch (error) {
      alert('An error occurred while submitting the request: ' + error.message);
    }
  }
</script>

<form on:submit|preventDefault={handleSubmit} class="form-container">
  <h2>Request to Become a Seller</h2>

  <input type="text" placeholder="Store Name" bind:value={storeName} required />

  <textarea
    rows="4"
    placeholder="Store Description"
    bind:value={storeDescription}
    required
  ></textarea>

  <textarea
    id="description"
    bind:value={description}
    rows="10"
    placeholder="Justification: Why do you want to become a seller?"
    required
  ></textarea>

  <button type="submit">Submit</button>
</form>

<style>
  .form-container {
    display: flex;
    flex-direction: column;
    gap: 16px;
    max-width: 800px;
    margin: 40px auto;
    width: 100%;
    padding: 30px;
    background-color: white;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.4);
    border-radius: 8px;
    color: #000;
  }

  h2 {
    text-align: center;
    max-width: 1200px;
    margin: 0;
    font-size: 1.5rem;
  }

  input,
  textarea,
  button {
    width: 100%;
    box-sizing: border-box;
  }

  input,
  textarea {
    padding: 15px;
    border-radius: 4px;
    border: 1px solid #888;
    font-size: 1rem;
    background-color: white;
    color: black;
  }

  textarea {
    resize: vertical;
  }

  button {
    padding: 12px 24px;
    background-color: #3f028f;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
  }

  button:hover {
    background-color: #5a31b0;
  }
</style>
