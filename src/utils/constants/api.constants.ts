// API Constants

export const API_CONSTANTS = {
  // HTTP Status Codes
  STATUS: {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    UNPROCESSABLE_ENTITY: 422,
    INTERNAL_SERVER_ERROR: 500,
  },
  
  // API Endpoints
  ENDPOINTS: {
    AUTH: '/auth',
    TEMPLATES: '/templates',
    CUSTOMERS: '/customers',
    ORDERS: '/orders',
    PRODUCTS: '/products',
    NOTIFICATIONS: '/notifications',
    UPLOAD: '/upload',
    ANALYTICS: '/analytics',
  },
  
  // Request Timeouts
  TIMEOUTS: {
    DEFAULT: 10000,
    UPLOAD: 30000,
    LONG_RUNNING: 60000,
  },
  
  // Pagination
  PAGINATION: {
    DEFAULT_PAGE: 1,
    DEFAULT_LIMIT: 10,
    MAX_LIMIT: 100,
  },
  
  // File Upload
  UPLOAD: {
    MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
    ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
    ALLOWED_DOCUMENT_TYPES: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
    MAX_FILES: 10,
  },
  
  // Cache
  CACHE: {
    DEFAULT_TTL: 5 * 60 * 1000, // 5 minutes
    LONG_TTL: 30 * 60 * 1000, // 30 minutes
    SHORT_TTL: 1 * 60 * 1000, // 1 minute
  },
  
  // Retry
  RETRY: {
    MAX_ATTEMPTS: 3,
    BASE_DELAY: 1000,
    MAX_DELAY: 10000,
  },
} as const;
