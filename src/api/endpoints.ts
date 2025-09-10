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
    UPDATE: (id: string) => `/templates/${id}`,
    DELETE: (id: string) => `/templates/${id}`,
    BY_CATEGORY: (category: string) => `/templates?category=${category}`,
    BY_TYPE: (templateType: string) => `/templates?templateType=${templateType}`,
    BY_TYPE_AND_CATEGORY: (templateType: string, category: string) => `/templates?templateType=${templateType}&category=${category}`,
    UPLOAD_IMAGE: '/templates/upload-image',
  },
  
  // Customers
  CUSTOMERS: {
    BASE: '/customers',
    CREATE: '/customers',
    UPDATE: (id: string) => `/customers/${id}`,
    DELETE: (id: string) => `/customers/${id}`,
    SEARCH: '/customers/search',
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
