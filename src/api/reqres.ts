import axios from 'axios';

const api = axios.create({
  baseURL: 'https://reqres.in/api',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': 'reqres-free-v1', // Add API key to header
  },
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token && config.url !== '/login') {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;