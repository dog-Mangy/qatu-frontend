<script>
  import { onMount } from 'svelte';
  import { getAllRequests, deleteRequestById, updateRequestStatus  } from '../../viewmodel/viewmodels/requestViewModel.js';

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

  function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  async function approveRequest(id) {
  const confirmReject = confirm('¿Estás seguro de que deseas aceptar esta solicitud?');
  if (!confirmReject) return;

  try {
    await updateRequestStatus(id, 1);
    requests = requests.map(req => req.id === id ? { ...req, status: 'Accepted' } : req);
  } catch (err) {
    error = err.message;
  }
}

  async function rejectRequest(id) {
  const confirmReject = confirm('¿Estás seguro de que deseas rechazar esta solicitud?');
  if (!confirmReject) return;

  try {
    await updateRequestStatus(id, 2);
    requests = requests.map(req => req.id === id ? { ...req, status: 'Rejected' } : req);
  } catch (err) {
    error = err.message;
  }
}

  async function deleteRequest(id) {
  const confirmDelete = confirm('¿Estás seguro de que deseas eliminar esta solicitud?');
  if (!confirmDelete) return;

  try {
    await deleteRequestById(id);
    requests = requests.filter(req => req.id !== id);  
  } catch (err) {
    error = err.message;
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
          <th>Usuario</th>
          <th>Nombre de la tienda</th>
          <th>Descripción de la tienda</th>
          <th>Descripción</th>
          <th>Estado</th>
          <th>Creado el</th>
          <th>Acciones</th>
        </tr>
      </thead>

      <tbody>
        {#each requests as req}
          <tr>
            <td>{req.userId}</td>
            <td>{req.storeName}</td>
            <td>{req.storeDescription}</td>
            <td>{req.description}</td>
            <td>{translateStatus(req.status)}</td>
            <td>{formatDate(req.createdAt)}</td>
            <td class="actions">
              <button title="Aprobar" on:click={() => approveRequest(req.id)}>✅</button>
              <button title="Rechazar" on:click={() => rejectRequest(req.id)}>❌</button>
              <button title="Eliminar" on:click={() => deleteRequest(req.id)}>🗑️</button>
            </td>
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
