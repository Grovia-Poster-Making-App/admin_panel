// API Configuration
// export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://api.grovia.pro';
export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000';
export const API_TIMEOUT = 10000; // 10 seconds for regular API calls
export const API_UPLOAD_TIMEOUT = 120000; // 2 minutes for file uploads
export const API_RETRY_ATTEMPTS = 3;
export const API_RETRY_DELAY = 1000; // 1 second

// Environment configuration
export const ENV = {
  DEVELOPMENT: process.env.NODE_ENV === 'development',
  PRODUCTION: process.env.NODE_ENV === 'production',
  TEST: process.env.NODE_ENV === 'test',
};

// API Feature flags
export const API_FEATURES = {
  ENABLE_CACHING: true,
  ENABLE_RETRY: true,
  ENABLE_LOGGING: ENV.DEVELOPMENT,
  ENABLE_MOCK_DATA: ENV.DEVELOPMENT,
};
