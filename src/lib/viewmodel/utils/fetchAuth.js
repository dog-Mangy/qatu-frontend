import { authService } from '../services/authService.js';

export async function fetchAuth(url, options = {}) {
  const token = await authService.getToken();

  const authHeaders = {
    ...options.headers,
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  return fetch(url, {
    ...options,
    headers: authHeaders,
  });
}
