import { AxiosError } from 'axios';
import { ApiError } from '../types';

// Error interceptor for handling API errors
export const errorInterceptor = {
  onResponseError: (error: AxiosError): Promise<ApiError> => {
    const apiError: ApiError = {
      message: 'An unexpected error occurred',
      status: 500,
      code: 'UNKNOWN_ERROR',
    };

    if (error.response) {
      // Server responded with error status
      const responseData = error.response.data as any;
      
      apiError.status = error.response.status;
      apiError.message = responseData?.message || error.message;
      apiError.code = responseData?.code || `HTTP_${error.response.status}`;
      apiError.details = responseData?.details || responseData;
    } else if (error.request) {
      // Network error
      apiError.message = 'Network error - please check your connection';
      apiError.code = 'NETWORK_ERROR';
    } else {
      // Request setup error
      apiError.message = error.message;
      apiError.code = 'REQUEST_ERROR';
    }

    // Log error in development
    if (process.env.NODE_ENV === 'development') {
      console.error('API Error:', apiError);
    }

    return Promise.reject(apiError);
  },
};
