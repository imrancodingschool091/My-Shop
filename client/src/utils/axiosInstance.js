import axios from "axios";
import { getAccessToken, setAccessToken, clearAccessToken } from "./tokenUtils";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

// Request interceptor
axiosInstance.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor - FIXED: Better error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Don't retry for login/register errors
    if (error.response?.status === 401 && 
        (originalRequest.url?.includes('/auth/login') || 
         originalRequest.url?.includes('/auth/register'))) {
      return Promise.reject(error);
    }

    // Check if it's a 401 error AND not a refresh request AND not already retried
    if (error.response?.status === 401 && 
        !originalRequest._retry && 
        !originalRequest.url?.includes('/auth/refresh')) {
      
      originalRequest._retry = true;

      try {
        const { data } = await axiosInstance.post("/auth/refresh", {});
        setAccessToken(data.accessToken);
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        clearAccessToken();
        if (window.location.pathname !== '/login' && 
            !window.location.pathname.includes('/verify-email') &&
            !window.location.pathname.includes('/reset-password')) {
          window.location.href = '/login';
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;