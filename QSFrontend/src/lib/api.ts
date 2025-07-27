import axios from 'axios';

// API base URLs - Dynamically detect current host for universal network compatibility
const getCurrentHost = () => {
  const hostname = window.location.hostname;
  // Use localhost for local development, otherwise use the current host IP
  return hostname === 'localhost' || hostname === '127.0.0.1' ? 'localhost' : hostname;
};

const currentHost = getCurrentHost();
const USERS_API_URL = `http://${currentHost}:8001`;
const INVENTORY_API_URL = `http://${currentHost}:8000`;

// Create axios instances for each backend
export const usersApi = axios.create({
  baseURL: USERS_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Include cookies for authentication
});

export const inventoryApi = axios.create({
  baseURL: INVENTORY_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
usersApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

inventoryApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle authentication errors
const handleAuthError = (error: any) => {
  if (error.response?.status === 401) {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    // Redirect to login page
    window.location.href = '/login';
  }
  return Promise.reject(error);
};

usersApi.interceptors.response.use(
  (response) => response,
  handleAuthError
);

inventoryApi.interceptors.response.use(
  (response) => response,
  handleAuthError
); 