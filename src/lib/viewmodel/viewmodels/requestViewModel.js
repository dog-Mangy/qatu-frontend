import { fetchAuth } from '../utils/fetchAuth.js';

export async function getAllRequests() {
  const response = await fetchAuth('http://localhost:5028/api/requests');

  if (!response.ok) {
    throw new Error('Error obteniendo las solicitudes');
  }

  return await response.json();
}

export async function createRequest(newRequestData) {
  const response = await fetchAuth('http://localhost:5028/api/requests', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newRequestData),
  });

  if (!response.ok) {
    throw new Error('Error creando solicitud');
  }

  return await response.json();
}


export async function deleteRequestById(id) {
  const response = await fetchAuth(`http://localhost:5028/api/requests/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Error eliminando la solicitud');
  }

  return true;
}


export async function updateRequestStatus(id, status) {
  const response = await fetchAuth(`http://localhost:5028/api/requests/${id}/status`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ status })
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.message || 'Error al actualizar estado');
  }

  return await response.json();
}
