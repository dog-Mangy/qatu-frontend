<script>
  let description = '';

  function handleSubmit() {
    alert(`Descripción enviada:\n${description}`);
    description = '';
  }
</script>

<form on:submit|preventDefault={handleSubmit} class="form-container">
  <h2>Justifica por qué quieres ser vendedor</h2>

  <textarea
    id="description"
    bind:value={description}
    rows="10"
    placeholder="Escribe aquí tu justificación..."
    required
  ></textarea>

  <button type="submit">Enviar</button>
</form>

<style>
  .form-container {
    display: flex;
    flex-direction: column;
    gap: 16px;
    max-width: 700px;
    margin: 40px auto;
    padding: 30px;
    background-color: white; 
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.4);
    border-radius: 8px;
    color: #000;
  }

  h2 {
    text-align: center;
    margin: 0;
    font-size: 1.5rem;
  }

  label {
    font-weight: bold;
  }

  textarea {
    padding: 15px;
    border-radius: 4px;
    border: 1px solid #888;
    resize: vertical;
    font-size: 1rem;
    height: 200px; 
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

  textarea {
  padding: 15px;
  border-radius: 4px;
  border: 1px solid #888;
  resize: vertical;
  font-size: 1rem;
  height: 200px;
  background-color: white;  
  color: black;             
}


  button:hover {
    background-color: #5a31b0;
  }
</style>
