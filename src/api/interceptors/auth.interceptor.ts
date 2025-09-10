import { InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

// Auth interceptor for handling authentication
export const authInterceptor = {
  // Request interceptor
  onRequest: (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = localStorage.getItem('authToken');
    
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },

  // Response interceptor for handling auth errors
  onResponseError: (error: AxiosError): Promise<AxiosError> => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('authToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      
      // Redirect to login if not already there
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    
    return Promise.reject(error);
  },
};
