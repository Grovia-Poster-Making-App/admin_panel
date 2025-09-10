import { useState, useEffect, useCallback } from 'react';
import { ApiResponse, ApiError } from '../api/types';

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: ApiError | null;
  success: boolean;
}

interface UseApiOptions {
  immediate?: boolean;
  onSuccess?: (data: any) => void;
  onError?: (error: ApiError) => void;
}

export function useApi<T = any>(
  apiFunction: (...args: any[]) => Promise<T>,
  options: UseApiOptions = {}
) {
  const { immediate = false, onSuccess, onError } = options;
  
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: false,
    error: null,
    success: false,
  });

  const execute = useCallback(async (...args: any[]) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const data = await apiFunction(...args);
      setState({
        data,
        loading: false,
        error: null,
        success: true,
      });
      onSuccess?.(data);
      return data;
    } catch (error: any) {
      const apiError: ApiError = {
        message: error.message || 'An error occurred',
        status: error.response?.status || 500,
        code: error.code,
        details: error.response?.data,
      };
      
      setState({
        data: null,
        loading: false,
        error: apiError,
        success: false,
      });
      onError?.(apiError);
      throw error;
    }
  }, [apiFunction, onSuccess, onError]);

  const reset = useCallback(() => {
    setState({
      data: null,
      loading: false,
      error: null,
      success: false,
    });
  }, []);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [immediate, execute]);

  return {
    ...state,
    execute,
    reset,
  };
}
