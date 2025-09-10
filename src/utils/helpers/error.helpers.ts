import { ERROR_CONSTANTS } from '../constants/error.constants';
import { ApiError } from '../../api/types';

/**
 * Get user-friendly error message
 */
export function getErrorMessage(error: any): string {
  if (typeof error === 'string') {
    return error;
  }
  
  if (error?.message) {
    return error.message;
  }
  
  if (error?.response?.data?.message) {
    return error.response.data.message;
  }
  
  if (error?.code) {
    const message = ERROR_CONSTANTS.MESSAGES[error.code as keyof typeof ERROR_CONSTANTS.MESSAGES];
    if (message) {
      return message;
    }
  }
  
  return ERROR_CONSTANTS.MESSAGES.UNKNOWN_ERROR;
}

/**
 * Get error code from HTTP status
 */
export function getErrorCodeFromStatus(status: number): string {
  return ERROR_CONSTANTS.STATUS_TO_CODE[status as keyof typeof ERROR_CONSTANTS.STATUS_TO_CODE] || 
         ERROR_CONSTANTS.CODES.UNKNOWN_ERROR;
}

/**
 * Create standardized API error
 */
export function createApiError(
  message: string,
  status: number = 500,
  code?: string,
  details?: any
): ApiError {
  return {
    message,
    status,
    code: code || getErrorCodeFromStatus(status),
    details,
  };
}

/**
 * Check if error is network related
 */
export function isNetworkError(error: any): boolean {
  return !error.response && error.request;
}

/**
 * Check if error is timeout related
 */
export function isTimeoutError(error: any): boolean {
  return error.code === 'ECONNABORTED' || 
         error.message?.includes('timeout') ||
         error.status === 504;
}

/**
 * Check if error is validation related
 */
export function isValidationError(error: any): boolean {
  return error.status === 400 || 
         error.status === 422 ||
         error.code === ERROR_CONSTANTS.CODES.VALIDATION_ERROR;
}

/**
 * Check if error is authentication related
 */
export function isAuthError(error: any): boolean {
  return error.status === 401 || 
         error.code === ERROR_CONSTANTS.CODES.UNAUTHORIZED;
}

/**
 * Check if error is authorization related
 */
export function isAuthorizationError(error: any): boolean {
  return error.status === 403 || 
         error.code === ERROR_CONSTANTS.CODES.FORBIDDEN;
}

/**
 * Check if error is not found related
 */
export function isNotFoundError(error: any): boolean {
  return error.status === 404 || 
         error.code === ERROR_CONSTANTS.CODES.NOT_FOUND;
}

/**
 * Log error for debugging
 */
export function logError(error: any, context?: string): void {
  if (process.env.NODE_ENV === 'development') {
    console.error(`[${context || 'API'}] Error:`, {
      message: error.message,
      status: error.status,
      code: error.code,
      details: error.details,
      stack: error.stack,
    });
  }
}
