// API Endpoints Configuration
export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    PROFILE: '/auth/profile',
  },
  
  // Templates
  TEMPLATES: {
    BASE: '/api/admin/templates',
    CREATE: '/api/admin/templates',
    GET: (id: string) => `/api/admin/templates/${id}`,
    UPDATE: (id: string) => `/api/admin/templates/${id}`,
    DELETE: (id: string) => `/api/admin/templates/${id}`,
    BY_CATEGORY: (category: string) => `/api/admin/templates?category=${category}`,
    BY_TYPE: (templateType: string) => `/api/admin/templates?templateType=${templateType}`,
    BY_TYPE_AND_CATEGORY: (templateType: string, category: string) => `/api/admin/templates?templateType=${templateType}&category=${category}`,
    UPLOAD_IMAGE: '/api/admin/templates/upload-image',
  },
  
  // Customers/Users
  CUSTOMERS: {
    BASE: '/api/auth/admin/users',
    CREATE: '/api/auth/admin/users',
    UPDATE: (id: string) => `/api/auth/admin/users/${id}`,
    DELETE: (id: string) => `/api/auth/admin/users/${id}`,
    SEARCH: '/api/auth/admin/users/search',
  },
  
  // Orders
  ORDERS: {
    BASE: '/orders',
    CREATE: '/orders',
    UPDATE: (id: string) => `/orders/${id}`,
    DELETE: (id: string) => `/orders/${id}`,
    BY_CUSTOMER: (customerId: string) => `/orders/customer/${customerId}`,
  },
  
  // Products
  PRODUCTS: {
    BASE: '/products',
    CREATE: '/products',
    UPDATE: (id: string) => `/products/${id}`,
    DELETE: (id: string) => `/products/${id}`,
  },
  
  // Notifications
  NOTIFICATIONS: {
    BASE: '/notifications',
    SEND: '/notifications/send',
    HISTORY: '/notifications/history',
  },
  
  // Upload
  UPLOAD: {
    IMAGE: '/upload/image',
    DOCUMENT: '/upload/document',
    BULK: '/upload/bulk',
    CLOUDINARY: '/api/file-upload/upload',
  },
  
  // Analytics
  ANALYTICS: {
    DASHBOARD: '/analytics/dashboard',
    TEMPLATES: '/analytics/templates',
    CUSTOMERS: '/analytics/customers',
    ORDERS: '/analytics/orders',
  },
} as const;
