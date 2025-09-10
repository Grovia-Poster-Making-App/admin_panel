// Error Constants

export const ERROR_CONSTANTS = {
  // Error Messages
  MESSAGES: {
    NETWORK_ERROR: 'Network error - please check your connection',
    SERVER_ERROR: 'Server error - please try again later',
    UNAUTHORIZED: 'You are not authorized to perform this action',
    FORBIDDEN: 'Access denied',
    NOT_FOUND: 'The requested resource was not found',
    VALIDATION_ERROR: 'Please check your input and try again',
    TIMEOUT_ERROR: 'Request timed out - please try again',
    UNKNOWN_ERROR: 'An unexpected error occurred',
  },
  
  // Error Codes
  CODES: {
    NETWORK_ERROR: 'NETWORK_ERROR',
    SERVER_ERROR: 'SERVER_ERROR',
    UNAUTHORIZED: 'UNAUTHORIZED',
    FORBIDDEN: 'FORBIDDEN',
    NOT_FOUND: 'NOT_FOUND',
    VALIDATION_ERROR: 'VALIDATION_ERROR',
    TIMEOUT_ERROR: 'TIMEOUT_ERROR',
    UNKNOWN_ERROR: 'UNKNOWN_ERROR',
  },
  
  // HTTP Status to Error Code Mapping
  STATUS_TO_CODE: {
    400: 'VALIDATION_ERROR',
    401: 'UNAUTHORIZED',
    403: 'FORBIDDEN',
    404: 'NOT_FOUND',
    409: 'VALIDATION_ERROR',
    422: 'VALIDATION_ERROR',
    500: 'SERVER_ERROR',
    502: 'SERVER_ERROR',
    503: 'SERVER_ERROR',
    504: 'TIMEOUT_ERROR',
  },
} as const;
