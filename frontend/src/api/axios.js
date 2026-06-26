import axios from 'axios';

const API = axios.create({
  baseURL: '', 
  headers: {
    'Content-Type': 'application/json',
  },
});

// AUTOMATION INTERCEPTOR: Attaches JWT tokens to protected endpoints automatically
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default API;
