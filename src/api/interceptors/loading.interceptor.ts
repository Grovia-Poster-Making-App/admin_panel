import { InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

// Extend InternalAxiosRequestConfig to include metadata
interface ExtendedAxiosRequestConfig extends InternalAxiosRequestConfig {
  metadata?: {
    startTime: number;
  };
}

// Loading interceptor for managing loading states
export const loadingInterceptor = {
  // Request interceptor
  onRequest: (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    // Add request timestamp
    (config as ExtendedAxiosRequestConfig).metadata = {
      ...(config as ExtendedAxiosRequestConfig).metadata,
      startTime: new Date().getTime(),
    };
    
    return config;
  },

  // Response interceptor
  onResponse: (response: AxiosResponse): AxiosResponse => {
    const config = response.config as ExtendedAxiosRequestConfig;
    const duration = new Date().getTime() - (config.metadata?.startTime || 0);
    
    // Log request duration in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`API Request completed in ${duration}ms:`, {
        method: response.config.method?.toUpperCase(),
        url: response.config.url,
        status: response.status,
        duration: `${duration}ms`,
      });
    }
    
    return response;
  },

  // Response error interceptor
  onResponseError: (error: AxiosError): Promise<AxiosError> => {
    const config = error.config as ExtendedAxiosRequestConfig;
    const duration = new Date().getTime() - (config?.metadata?.startTime || 0);
    
    // Log error duration in development
    if (process.env.NODE_ENV === 'development') {
      console.error(`API Request failed after ${duration}ms:`, {
        method: error.config?.method?.toUpperCase(),
        url: error.config?.url,
        status: error.response?.status,
        duration: `${duration}ms`,
        error: error.message,
      });
    }
    
    return Promise.reject(error);
  },
};
