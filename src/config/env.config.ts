// Environment Configuration
export const ENV_CONFIG = {
  API_BASE_URL: process.env.REACT_APP_API_BASE_URL || 'https://api.grovia.pro',
  APP_NAME: process.env.REACT_APP_NAME || 'Grovia Admin Panel',
  APP_VERSION: process.env.REACT_APP_VERSION || '1.0.0',
  ENABLE_DEVTOOLS: process.env.REACT_APP_ENABLE_DEVTOOLS === 'true',
  LOG_LEVEL: process.env.REACT_APP_LOG_LEVEL || 'info',
} as const;
