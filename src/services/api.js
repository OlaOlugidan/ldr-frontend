import axios from "axios";
import { API_BASE_URL } from "../config"; // Importing from config.js

// Fetch function for milestones (optional if you prefer axios)
export const fetchMilestones = async () => {
  const response = await fetch(`${API_BASE_URL}/api/milestones`);
  return response.json();
};

// Axios instance with API base URL
const api = axios.create({
  baseURL: API_BASE_URL, // Use the same base URL from config.js
  timeout: 10000,
});

// Request interceptor to attach JWT token from local storage (or global state)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
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
    if (error.response && error.response.status === 401) {
      // Implement token refresh logic here if needed
    }
    return Promise.reject(error);
  }
);

export default api;
