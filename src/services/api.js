// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3000/api',
  timeout: 10000,
});

// Request interceptor to attach JWT token from local storage (or global state)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle errors globally (e.g., token expiry)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Optionally check for 401 errors to trigger a token refresh
    if (error.response && error.response.status === 401) {
      // Implement refresh token logic here if needed
      // e.g., call a refresh endpoint, update localStorage, then retry original request
    }
    return Promise.reject(error);
  }
);

export default api;
