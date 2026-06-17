const BASE = import.meta.env.VITE_API_URL || '/api';

const req = async (method, path, body) => {
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || `Error ${res.status}`);
  }
  return res.json();
};

export const productService = {
  getAll: () => req('GET', '/products'),
  getById: (id) => req('GET', `/products/${id}`),
  create: (data) => req('POST', '/products', data),
  update: (id, data) => req('PUT', `/products/${id}`, data),
  remove: (id) => req('DELETE', `/products/${id}`),
  getStats: () => req('GET', '/products/stats')
};
