import axios from 'axios';

// ✅ FIXED: Render ki link yahan add karo
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://student-mate-backend.onrender.com';

const api = axios.create({
  // Base URL ko dynamic bana diya
  baseURL: `${API_BASE_URL}/api`,
});

// Add a request interceptor to add the auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
