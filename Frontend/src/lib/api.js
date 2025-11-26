const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api';

const getStoredToken = () => {
  try {
    const stored = localStorage.getItem('college-app-token');
    if (stored) {
      const tokens = JSON.parse(stored);
      return tokens.accessToken;
    }
  } catch (err) {
    // ignore
  }
  return null;
};

const handleResponse = async (response) => {
  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    const error = new Error(payload.message || 'Request failed');
    error.status = response.status;
    error.data = payload;
    throw error;
  }

  return payload;
};

export const apiRequest = async (path, { method = 'GET', body, token, signal } = {}) => {
  const headers = { 'Content-Type': 'application/json' };

  const accessToken = token || getStoredToken();
  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers,
    credentials: 'include',
    body: body ? JSON.stringify(body) : undefined,
    signal
  });

  return handleResponse(response);
};

export const getBaseUrl = () => API_BASE_URL;

export default {
  apiRequest,
  getBaseUrl
};

