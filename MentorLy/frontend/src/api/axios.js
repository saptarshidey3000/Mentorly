import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api',
  timeout: 40000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor if needed (e.g. add token)
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor if needed
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // You can handle token expiration here
    return Promise.reject(error);
  }
);

export default axiosInstance;
