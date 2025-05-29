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
