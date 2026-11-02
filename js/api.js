/*
 * API Adapter — Risss.clobber
 *
 * Menyediakan komunikasi dengan Express API dan PostgreSQL.
 * Frontend tetap memiliki fallback localStorage pada modul katalog.
 */
const API_BASE = '/api';
let isBackendAvailable = null;

async function checkBackendHealth() {
  if (isBackendAvailable !== null) return isBackendAvailable;
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 1200);
    const res = await fetch(`${API_BASE}/health`, { signal: controller.signal });
    clearTimeout(timer);
    isBackendAvailable = res.ok;
  } catch {
    isBackendAvailable = false;
  }
  return isBackendAvailable;
}

async function apiRequest(path, options = {}) {
  const url = `${API_BASE}${path}`;
  const config = {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    },
    ...options
  };
  if (config.body && typeof config.body === 'object') {
    config.body = JSON.stringify(config.body);
  }

  const res = await fetch(url, config);
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(data.error || `Request gagal dengan status ${res.status}`);
    err.status = res.status;
    err.data = data;
    throw err;
  }
  return data;
}

const api = {
  isAvailable: () => isBackendAvailable,
  checkHealth: checkBackendHealth,
  request: apiRequest,

  // Catalog
  async getProducts(params = {}) {
    const query = new URLSearchParams(params).toString();
    return apiRequest(`/products${query ? `?${query}` : ''}`);
  },

  // Auth
  async login(email, password) {
    return apiRequest('/auth/login', {
      method: 'POST',
      body: { email, password }
    });
  },

  async register(fullName, email, password, phone = '') {
    return apiRequest('/auth/register', {
      method: 'POST',
      body: { fullName, email, password, phone }
    });
  },

  async logout() {
    return apiRequest('/auth/logout', { method: 'POST' });
  },

  async me() {
    return apiRequest('/auth/me');
  },

  // Orders
  async createOrder(orderPayload) {
    return apiRequest('/orders', {
      method: 'POST',
      body: orderPayload
    });
  },

  async getOrders() {
    return apiRequest('/orders');
  },

  // Admin
  async getAdminMetrics() {
    return apiRequest('/admin/metrics');
  },

  async getAdminOrders(params = {}) {
    const query = new URLSearchParams(params).toString();
    return apiRequest(`/admin/orders${query ? `?${query}` : ''}`);
  },

  async updateOrderStatus(orderId, status) {
    return apiRequest(`/admin/orders/${encodeURIComponent(orderId)}/status`, {
      method: 'PUT',
      body: { status }
    });
  }
};

window.risssApi = api;
// Panggilan backend dinonaktifkan untuk mode frontend-only.
// Health check dapat dipanggil secara manual jika diperlukan: window.risssApi.checkHealth()
