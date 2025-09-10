# API Integration Examples

This directory contains examples of how to use the new API integration structure in your Grovia Admin Panel.

## Files

- `ApiIntegrationExample.tsx` - Complete example showing how to use all the new API hooks and services

## Usage

### 1. Basic API Hook Usage

```tsx
import { useTemplates } from '../hooks/useTemplates';

const MyComponent = () => {
  const {
    templates,
    loading,
    error,
    createTemplate,
    updateTemplate,
    deleteTemplate,
  } = useTemplates();

  // Use the data and functions...
};
```

### 2. Authentication

```tsx
import { useAuth } from '../hooks/useAuth';

const LoginComponent = () => {
  const { login, logout, user, isAuthenticated } = useAuth();

  const handleLogin = async () => {
    try {
      await login({ email: 'user@example.com', password: 'password' });
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
        <button onClick={handleLogin}>Login</button>
      )}
    </div>
  );
};
```

### 3. Template Management

```tsx
import { useTemplates } from '../hooks/useTemplates';

const TemplateManager = () => {
  const {
    templates,
    loading,
    createTemplate,
    updateTemplate,
    deleteTemplate,
  } = useTemplates({ category: 'banner' });

  const handleCreate = async () => {
    const newTemplate = {
      title: 'New Banner',
      category: 'banner',
      type: 'banner',
      content: { templates: [] },
      settings: { isPublic: true, allowDownload: true, allowEdit: true, tags: [] },
    };

    try {
      await createTemplate(newTemplate);
      console.log('Template created successfully');
    } catch (error) {
      console.error('Failed to create template:', error);
    }
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
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
      )}
      <button onClick={handleCreate}>Create Template</button>
    </div>
  );
};
```

### 4. Error Handling

```tsx
import { useTemplates } from '../hooks/useTemplates';
import { getErrorMessage } from '../utils/helpers/error.helpers';

const ErrorHandlingExample = () => {
  const { templates, error, createTemplate } = useTemplates();

  const handleCreate = async () => {
    try {
      await createTemplate(/* template data */);
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      alert(`Error: ${errorMessage}`);
    }
  };

  return (
    <div>
      {error && (
        <div style={{ color: 'red' }}>
          Error: {getErrorMessage(error)}
        </div>
      )}
      {/* Rest of component */}
    </div>
  );
};
```

### 5. File Upload

```tsx
import { useTemplates } from '../hooks/useTemplates';

const FileUploadExample = () => {
  const { uploadImage } = useTemplates();

  const handleFileUpload = async (file: File) => {
    try {
      const result = await uploadImage(
        {
          templateId: 'template-id',
          file,
          type: 'image',
        },
        (progress) => {
          console.log(`Upload progress: ${progress.percentage}%`);
        }
      );
      console.log('File uploaded:', result.url);
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  return (
    <input
      type="file"
      onChange={(e) => {
        const file = e.target.files?.[0];
        if (file) handleFileUpload(file);
      }}
    />
  );
};
```

## Best Practices

1. **Always handle errors** - Use try-catch blocks and display user-friendly error messages
2. **Use loading states** - Show loading indicators while API calls are in progress
3. **Validate data** - Use the validation utilities before sending data to the API
4. **Optimize requests** - Use filters and pagination to avoid loading unnecessary data
5. **Cache data** - The hooks automatically cache data, but you can refresh when needed
6. **Type safety** - Use the provided TypeScript types for better development experience

## Environment Setup

Make sure to set up your environment variables:

```env
REACT_APP_API_BASE_URL=http://localhost:3001/api
REACT_APP_NAME=Grovia Admin Panel
REACT_APP_VERSION=1.0.0
```
