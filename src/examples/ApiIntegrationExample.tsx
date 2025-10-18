import React, { useState } from 'react';
import { useTemplates } from '../hooks/useTemplates';
import { useCustomers } from '../hooks/useCustomers';
import { useAuth } from '../hooks/useAuth';
import { CreateTemplateRequest, TemplateFilters } from '../api/types';

// Example component showing how to use the new API structure
const ApiIntegrationExample: React.FC = () => {
  const [templateFilters, setTemplateFilters] = useState<TemplateFilters>({
    page: 1,
    limit: 10,
    search: '',
    category: '',
  });

  // Using the new API hooks
  const {
    templates,
    pagination,
    loading: templatesLoading,
    error: templatesError,
    createTemplate,
    updateTemplate,
    deleteTemplate,
    refreshTemplates,
  } = useTemplates(templateFilters);

  const {
    customers,
    loading: customersLoading,
    createCustomer,
    updateCustomer,
    deleteCustomer,
  } = useCustomers();

  const {
    user,
    isAuthenticated,
    login,
    logout,
    updateProfile,
  } = useAuth();

  // Example: Create a new template
  const handleCreateTemplate = async () => {
    try {
      const newTemplate: CreateTemplateRequest = {
        templateType: 'story',
        category: 'Stories',
        title: 'Example Story Template',
        subtitle: 'An example subtitle for the story template',
        headImageUrl: undefined,
        titleBackgroundImageUrl: undefined,
        templates: [],
      };

      const createdTemplate = await createTemplate(newTemplate);
      console.log('Template created:', createdTemplate);
    } catch (error) {
      console.error('Error creating template:', error);
    }
  };

  // Example: Update template filters
  const handleFilterChange = (newFilters: Partial<TemplateFilters>) => {
    setTemplateFilters(prev => ({ ...prev, ...newFilters }));
  };

  // Example: Handle search
  const handleSearch = (searchTerm: string) => {
    handleFilterChange({ search: searchTerm, page: 1 });
  };

  // Example: Handle pagination
  const handlePageChange = (page: number) => {
    handleFilterChange({ page });
  };

  if (!isAuthenticated) {
    return (
      <div>
        <h2>Please log in to access the admin panel</h2>
        <button onClick={() => login({ email: 'admin@example.com', password: 'password' })}>
          Login
        </button>
      </div>
    );
  }

  return (
    <div>
      <h1>API Integration Example</h1>
      
      {/* User Profile */}
      <div>
        <h2>Welcome, {user?.name}</h2>
        <button onClick={logout}>Logout</button>
      </div>

      {/* Templates Section */}
      <div>
        <h2>Templates</h2>
        
        {/* Search */}
        <input
          type="text"
          placeholder="Search templates..."
          onChange={(e) => handleSearch(e.target.value)}
        />

        {/* Create Template Button */}
        <button onClick={handleCreateTemplate} disabled={templatesLoading}>
          Create Template
        </button>

        {/* Templates List */}
        {templatesLoading ? (
          <p>Loading templates...</p>
        ) : templatesError ? (
          <p>Error: {templatesError.message}</p>
        ) : (
          <div>
            {templates.map(template => (
              <div key={template._id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
                <h3>{template.category}</h3>
                <p>Type: {template.templateType}</p>
                <p>Templates Count: {template.templates.length}</p>
                <button onClick={() => updateTemplate(template._id, { category: 'Updated Category' })}>
                  Update
                </button>
                <button onClick={() => deleteTemplate(template._id)}>
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        <div>
          <button
            onClick={() => handlePageChange(pagination.page - 1)}
            disabled={pagination.page <= 1}
          >
            Previous
          </button>
          <span>Page {pagination.page} of {pagination.totalPages}</span>
          <button
            onClick={() => handlePageChange(pagination.page + 1)}
            disabled={pagination.page >= pagination.totalPages}
          >
            Next
          </button>
        </div>
      </div>

      {/* Customers Section */}
      <div>
        <h2>Customers</h2>
        {customersLoading ? (
          <p>Loading customers...</p>
        ) : (
          <div>
            {customers.map(customer => (
              <div key={customer.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
                <h3>{customer.name}</h3>
                <p>Email: {customer.email}</p>
                <p>Status: {customer.status}</p>
                <button onClick={() => updateCustomer(customer.id, { id: customer.id, name: 'Updated Name' })}>
                  Update
                </button>
                <button onClick={() => deleteCustomer(customer.id)}>
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ApiIntegrationExample;
