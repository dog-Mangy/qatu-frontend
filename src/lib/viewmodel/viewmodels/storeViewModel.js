import { fetchAuth } from "../utils/fetchAuth.js";

export async function getAllStores() {
  const response = await fetchAuth('http://localhost:5028/api/stores');

  if (!response.ok) {
    throw new Error('Error obteniendo las tiendas');
  }

  return await response.json();
}


export async function createStore({ UserId, Name, Description }) {
  const data = { UserId, Name, Description };

  const response = await fetchAuth('http://localhost:5028/api/stores', { 
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text);
  }

  return await response.json();
}
