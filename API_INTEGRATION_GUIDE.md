# API Integration Guide for Grovia Admin Panel

## Overview

This guide provides a comprehensive overview of the API integration structure implemented for your Grovia Admin Panel. The new structure follows modern React patterns and provides a scalable, maintainable approach to API integration.

## 📁 Folder Structure

```
src/
├── api/                          # API layer
│   ├── index.ts                  # Main API exports
│   ├── client.ts                 # Axios client configuration
│   ├── endpoints.ts              # API endpoints configuration
│   ├── types/                    # TypeScript type definitions
│   │   ├── index.ts
│   │   ├── auth.types.ts
│   │   ├── templates.types.ts
│   │   ├── customers.types.ts
│   │   ├── orders.types.ts
│   │   └── common.types.ts
│   ├── services/                 # API service functions
│   │   ├── index.ts
│   │   ├── auth.service.ts
│   │   ├── templates.service.ts
│   │   ├── customers.service.ts
│   │   ├── orders.service.ts
│   │   ├── notifications.service.ts
│   │   └── upload.service.ts
│   ├── interceptors/             # Request/Response interceptors
│   │   ├── auth.interceptor.ts
│   │   ├── error.interceptor.ts
│   │   └── loading.interceptor.ts
│   └── utils/                    # API utilities
│       ├── api.utils.ts
│       ├── validation.utils.ts
│       └── transform.utils.ts
├── hooks/                        # Enhanced custom hooks
│   ├── useApi.ts                 # Generic API hook
│   ├── useTemplates.ts           # Templates-specific hooks
│   ├── useCustomers.ts           # Customers-specific hooks
│   ├── useOrders.ts              # Orders-specific hooks
│   └── useAuth.ts                # Authentication hooks
├── utils/                        # General utilities
│   ├── constants/
│   │   ├── api.constants.ts
│   │   └── error.constants.ts
│   └── helpers/
│       ├── error.helpers.ts
│       └── data.helpers.ts
├── config/                       # Configuration files
│   ├── api.config.ts
│   └── env.config.ts
└── examples/                     # Usage examples
    ├── ApiIntegrationExample.tsx
    └── README.md
```

## 🚀 Key Features

### 1. **Type Safety**
- Complete TypeScript coverage
- Strongly typed API responses
- Type-safe service functions
- Interface definitions for all data models

### 2. **Error Handling**
- Centralized error management
- User-friendly error messages
- Automatic error logging
- Retry mechanisms with exponential backoff

### 3. **Loading States**
- Built-in loading state management
- Request duration tracking
- Progress indicators for uploads
- Optimistic updates

### 4. **Caching**
- Automatic response caching
- Cache invalidation strategies
- Memory-efficient storage
- Configurable TTL

### 5. **Authentication**
- JWT token management
- Automatic token refresh
- Secure storage
- Route protection

## 🔧 Configuration

### Environment Variables

Create a `.env` file in your project root:

```env
REACT_APP_API_BASE_URL=https://api.grovia.pro/api
REACT_APP_NAME=Grovia Admin Panel
REACT_APP_VERSION=1.0.0
REACT_APP_ENABLE_DEVTOOLS=false
REACT_APP_LOG_LEVEL=info
```

### API Configuration

The API client is configured in `src/config/api.config.ts`:

```typescript
export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://api.grovia.pro/api';
export const API_TIMEOUT = 10000; // 10 seconds
export const API_RETRY_ATTEMPTS = 3;
```

## 📚 Usage Examples

### Basic Hook Usage

```tsx
import { useTemplates } from '../hooks/useTemplates';

const TemplatesPage = () => {
  const {
    templates,
    loading,
    error,
    createTemplate,
    updateTemplate,
    deleteTemplate,
  } = useTemplates({ category: 'banner' });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {templates.map(template => (
        <div key={template.id}>
          <h3>{template.title}</h3>
          <button onClick={() => deleteTemplate(template.id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};
```

### Authentication

```tsx
import { useAuth } from '../hooks/useAuth';

const LoginPage = () => {
  const { login, logout, user, isAuthenticated } = useAuth();

  const handleLogin = async (credentials) => {
    try {
      await login(credentials);
      // Redirect to dashboard
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <p>Welcome, {user?.name}</p>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <LoginForm onSubmit={handleLogin} />
      )}
    </div>
  );
};
```

### File Upload

```tsx
import { useTemplates } from '../hooks/useTemplates';

const FileUpload = () => {
  const { uploadImage } = useTemplates();

  const handleUpload = async (file: File) => {
    try {
      const result = await uploadImage(
        {
          templateId: 'template-id',
          file,
          type: 'image',
        },
        (progress) => {
          console.log(`Progress: ${progress.percentage}%`);
        }
      );
      console.log('Uploaded:', result.url);
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  return (
    <input
      type="file"
      onChange={(e) => {
        const file = e.target.files?.[0];
        if (file) handleUpload(file);
      }}
    />
  );
};
```

## 🛠️ Service Functions

### Templates Service

```typescript
import { templatesService } from '../api/services';

// Get all templates
const templates = await templatesService.getTemplates({ category: 'banner' });

// Create template
const newTemplate = await templatesService.createTemplate({
  title: 'New Template',
  category: 'banner',
  type: 'banner',
  content: { templates: [] },
  settings: { isPublic: true, allowDownload: true, allowEdit: true, tags: [] },
});

// Update template
const updatedTemplate = await templatesService.updateTemplate('template-id', {
  title: 'Updated Title',
});

// Delete template
await templatesService.deleteTemplate('template-id');
```

### Customers Service

```typescript
import { customersService } from '../api/services';

// Get customers
const customers = await customersService.getCustomers({ status: 'active' });

// Create customer
const newCustomer = await customersService.createCustomer({
  name: 'John Doe',
  email: 'john@example.com',
  phone: '+1234567890',
});

// Update customer
const updatedCustomer = await customersService.updateCustomer('customer-id', {
  name: 'John Smith',
});
```

## 🔒 Security Features

### Authentication
- JWT token-based authentication
- Automatic token refresh
- Secure token storage
- Route protection

### Request Security
- CSRF protection
- Request validation
- Input sanitization
- Rate limiting

### Error Handling
- Secure error messages
- No sensitive data exposure
- Proper error logging
- User-friendly feedback

## 📊 Performance Optimizations

### Caching
- Response caching
- Cache invalidation
- Memory management
- TTL configuration

### Request Optimization
- Request deduplication
- Batch operations
- Pagination support
- Lazy loading

### Bundle Optimization
- Code splitting
- Tree shaking
- Dynamic imports
- Lazy loading

## 🧪 Testing

### Unit Tests
```typescript
import { renderHook, act } from '@testing-library/react-hooks';
import { useTemplates } from '../hooks/useTemplates';

test('should fetch templates', async () => {
  const { result } = renderHook(() => useTemplates());
  
  await act(async () => {
    await result.current.refreshTemplates();
  });
  
  expect(result.current.templates).toBeDefined();
  expect(result.current.loading).toBe(false);
});
```

### Integration Tests
```typescript
import { render, screen } from '@testing-library/react';
import { TemplatesPage } from '../pages/TemplatesPage';

test('should render templates page', () => {
  render(<TemplatesPage />);
  expect(screen.getByText('Templates')).toBeInTheDocument();
});
```

## 🚀 Deployment

### Build Configuration
```json
{
  "scripts": {
    "build": "react-scripts build",
    "build:api": "react-scripts build && cp -r src/api build/",
    "start": "react-scripts start",
    "start:dev": "REACT_APP_API_BASE_URL=http://localhost:3001/api react-scripts start",
    "start:prod": "REACT_APP_API_BASE_URL=https://api.grovia.pro/api react-scripts start",
    "test": "react-scripts test"
  },
  "proxy": "https://api.grovia.pro"
}
```

### Environment Setup
1. Set up your backend API
2. Configure environment variables
3. Update API endpoints
4. Test all integrations
5. Deploy to production

## 📝 Best Practices

### 1. **Error Handling**
- Always use try-catch blocks
- Display user-friendly error messages
- Log errors for debugging
- Implement retry mechanisms

### 2. **Loading States**
- Show loading indicators
- Use skeleton screens
- Implement optimistic updates
- Handle loading errors

### 3. **Data Management**
- Use pagination for large datasets
- Implement search and filtering
- Cache frequently accessed data
- Optimize API calls

### 4. **Type Safety**
- Use TypeScript interfaces
- Validate API responses
- Handle type errors gracefully
- Use strict type checking

### 5. **Performance**
- Implement lazy loading
- Use React.memo for optimization
- Minimize re-renders
- Optimize bundle size

## 🔄 Migration Guide

### From Old useFetch Hook

**Before:**
```typescript
import useFetch from '../hook/useFetch';

const { data, error, status } = useFetch('/api/templates');
```

**After:**
```typescript
import { useTemplates } from '../hooks/useTemplates';

const { templates, loading, error, refreshTemplates } = useTemplates();
```

### From Direct API Calls

**Before:**
```typescript
const fetchTemplates = async () => {
  const response = await fetch('/api/templates');
  const data = await response.json();
  setTemplates(data);
};
```

**After:**
```typescript
import { useTemplates } from '../hooks/useTemplates';

const { templates, loading, error } = useTemplates();
```

## 🚨 CORS Troubleshooting

### Common CORS Issues

#### 1. **Development CORS Error**
```
Access to XMLHttpRequest at 'https://api.grovia.pro/api/admin/templates' from origin 'http://localhost:3000' has been blocked by CORS policy
```

**Solutions:**
- Use the proxy configuration in `package.json`
- Run with development script: `npm run start:dev`
- Set up local backend server on `http://localhost:3001`

#### 2. **Rate Limiting Error**
```
GET https://api.grovia.pro/api/admin/templates net::ERR_FAILED 429 (Too Many Requests)
```

**Solutions:**
- Implement request throttling
- Add retry logic with exponential backoff
- Use local development server to avoid rate limits

#### 3. **Environment Configuration**

**Development:**
```bash
# Use local backend
npm run start:dev

# Or set environment variable
REACT_APP_API_BASE_URL=http://localhost:3001/api npm start
```

**Production:**
```bash
# Use production backend
npm run start:prod

# Or set environment variable
REACT_APP_API_BASE_URL=https://api.grovia.pro/api npm start
```

### Proxy Configuration

The `package.json` includes a proxy configuration:
```json
{
  "proxy": "https://api.grovia.pro"
}
```

This allows your development server to proxy API requests, avoiding CORS issues.

## 📞 Support

For questions or issues with the API integration:

1. Check the examples in `src/examples/`
2. Review the TypeScript types in `src/api/types/`
3. Consult the service functions in `src/api/services/`
4. Check the utility functions in `src/utils/helpers/`
5. Review CORS troubleshooting section above

## 🎯 Next Steps

1. **Set up your backend API** to match the expected endpoints
2. **Configure environment variables** for your API URL
3. **Update your components** to use the new hooks
4. **Test the integration** with real API calls
5. **Deploy and monitor** the application

This API integration structure provides a solid foundation for your Grovia Admin Panel and can be easily extended as your application grows.
