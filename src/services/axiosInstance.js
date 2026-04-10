import axios from 'axios';
 

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const INTERNAL_KEY = import.meta.env.VITE_INTERNAL_API_KEY;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': INTERNAL_KEY, 
  },
});
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token'); 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;