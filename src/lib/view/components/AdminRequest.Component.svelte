<script>
  import { onMount } from 'svelte';
  import { getAllRequests } from '../../viewmodel/viewmodels/requestViewModel.js';

  let requests = [];
  let error = '';

  onMount(async () => {
    try {
      requests = await getAllRequests();
    } catch (err) {
      error = err.message;
    }
  });

  function translateStatus(status) {
    switch (status) {
      case 'Pending': return 'Pendiente';
      case 'Accepted': return 'Aceptado';
      case 'Rejected': return 'Rechazado';
      default: return status;
    }
  }
</script>

{#if error}
  <p class="error">Error: {error}</p>
{:else}
  <div class="table-container">
    <h2>Lista de Solicitudes</h2>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Descripción</th>
          <th>Estado</th>
        </tr>
      </thead>
      <tbody>
        {#each requests as req}
          <tr>
            <td>{req.id}</td>
            <td>{req.description}</td>
            <td>{translateStatus(req.status)}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
{/if}

<style>
  .table-container {
    max-width: 1200px;
    margin: 40px auto;
    padding: 20px;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
    color: black;
  }

  h2 {
    text-align: center;
    margin-bottom: 20px;
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  th, td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #ccc;
  }

  th {
    background-color: #3f028f;
    color: white;
  }

  tr:nth-child(even) {
    background-color: #f9f9f9;
  }

  .error {
    color: red;
    text-align: center;
  }
</style>
