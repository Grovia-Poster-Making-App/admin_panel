// Data transformation utilities for API

/**
 * Transform API response to a more usable format
 */
export function transformApiResponse<T>(response: any): T {
  if (response?.data) {
    return response.data;
  }
  return response;
}

/**
 * Transform paginated response
 */
export function transformPaginatedResponse<T>(response: any): {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
} {
  return {
    data: response.data || [],
    pagination: {
      page: response.page || 1,
      limit: response.limit || 10,
      total: response.total || 0,
      totalPages: response.totalPages || 0,
    },
  };
}

/**
 * Transform template data for API
 */
export function transformTemplateForApi(template: any): any {
  return {
    ...template,
    // Ensure dates are in ISO format
    expiresAt: template.expiresAt ? new Date(template.expiresAt).toISOString() : undefined,
    // Transform nested objects
    content: {
      ...template.content,
      templates: template.content?.templates?.map((t: any) => ({
        ...t,
        expirationDate: t.expirationDate ? new Date(t.expirationDate).toISOString() : undefined,
      })) || [],
    },
  };
}

/**
 * Transform customer data for API
 */
export function transformCustomerForApi(customer: any): any {
  return {
    ...customer,
    // Ensure dates are in ISO format
    createdAt: customer.createdAt ? new Date(customer.createdAt).toISOString() : undefined,
    updatedAt: customer.updatedAt ? new Date(customer.updatedAt).toISOString() : undefined,
    lastLogin: customer.lastLogin ? new Date(customer.lastLogin).toISOString() : undefined,
  };
}

/**
 * Transform order data for API
 */
export function transformOrderForApi(order: any): any {
  return {
    ...order,
    // Ensure dates are in ISO format
    createdAt: order.createdAt ? new Date(order.createdAt).toISOString() : undefined,
    updatedAt: order.updatedAt ? new Date(order.updatedAt).toISOString() : undefined,
    completedAt: order.completedAt ? new Date(order.completedAt).toISOString() : undefined,
    // Transform nested objects
    items: order.items?.map((item: any) => ({
      ...item,
      // Ensure numeric values are properly formatted
      quantity: Number(item.quantity),
      unitPrice: Number(item.unitPrice),
      totalPrice: Number(item.totalPrice),
    })) || [],
    pricing: {
      ...order.pricing,
      subtotal: Number(order.pricing?.subtotal || 0),
      tax: Number(order.pricing?.tax || 0),
      shipping: Number(order.pricing?.shipping || 0),
      discount: Number(order.pricing?.discount || 0),
      total: Number(order.pricing?.total || 0),
    },
  };
}

/**
 * Transform file upload data
 */
export function transformFileUpload(file: File, metadata?: Record<string, any>): FormData {
  const formData = new FormData();
  formData.append('file', file);
  
  if (metadata) {
    Object.entries(metadata).forEach(([key, value]) => {
      formData.append(key, String(value));
    });
  }
  
  return formData;
}

/**
 * Transform search filters for API
 */
export function transformSearchFilters(filters: any): Record<string, any> {
  const transformed: Record<string, any> = {};
  
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      // Handle date ranges
      if (key.includes('Date') && value instanceof Date) {
        transformed[key] = value.toISOString();
      }
      // Handle arrays
      else if (Array.isArray(value) && value.length > 0) {
        transformed[key] = value.join(',');
      }
      // Handle booleans
      else if (typeof value === 'boolean') {
        transformed[key] = value ? 'true' : 'false';
      }
      // Handle other values
      else {
        transformed[key] = value;
      }
    }
  });
  
  return transformed;
}

/**
 * Transform API error to user-friendly message
 */
export function transformApiError(error: any): string {
  if (typeof error === 'string') {
    return error;
  }
  
  if (error?.message) {
    return error.message;
  }
  
  if (error?.response?.data?.message) {
    return error.response.data.message;
  }
  
  if (error?.response?.data?.errors) {
    const errors = error.response.data.errors;
    if (Array.isArray(errors)) {
      return errors.join(', ');
    }
    if (typeof errors === 'object') {
      return Object.values(errors).join(', ');
    }
  }
  
  return 'An unexpected error occurred';
}

/**
 * Transform data for display
 */
export function transformForDisplay(data: any): any {
  if (!data) return data;
  
  // Transform dates to readable format
  if (data.createdAt) {
    data.createdAt = new Date(data.createdAt).toLocaleDateString();
  }
  if (data.updatedAt) {
    data.updatedAt = new Date(data.updatedAt).toLocaleDateString();
  }
  if (data.lastLogin) {
    data.lastLogin = new Date(data.lastLogin).toLocaleDateString();
  }
  
  // Transform currency values
  if (data.total) {
    data.total = `$${Number(data.total).toFixed(2)}`;
  }
  if (data.price) {
    data.price = `$${Number(data.price).toFixed(2)}`;
  }
  
  return data;
}
