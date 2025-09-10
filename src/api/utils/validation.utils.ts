// Validation utilities for API data

export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: any) => boolean | string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

/**
 * Validate a single field
 */
export function validateField(
  value: any,
  rules: ValidationRule,
  fieldName: string
): string | null {
  // Required validation
  if (rules.required && (value === undefined || value === null || value === '')) {
    return `${fieldName} is required`;
  }

  // Skip other validations if value is empty and not required
  if (!rules.required && (value === undefined || value === null || value === '')) {
    return null;
  }

  // String length validations
  if (typeof value === 'string') {
    if (rules.minLength && value.length < rules.minLength) {
      return `${fieldName} must be at least ${rules.minLength} characters`;
    }
    
    if (rules.maxLength && value.length > rules.maxLength) {
      return `${fieldName} must be no more than ${rules.maxLength} characters`;
    }
  }

  // Pattern validation
  if (rules.pattern && typeof value === 'string' && !rules.pattern.test(value)) {
    return `${fieldName} format is invalid`;
  }

  // Custom validation
  if (rules.custom) {
    const result = rules.custom(value);
    if (result !== true) {
      return typeof result === 'string' ? result : `${fieldName} is invalid`;
    }
  }

  return null;
}

/**
 * Validate an object against validation rules
 */
export function validateObject(
  data: Record<string, any>,
  rules: Record<string, ValidationRule>
): ValidationResult {
  const errors: Record<string, string> = {};

  Object.entries(rules).forEach(([fieldName, fieldRules]) => {
    const error = validateField(data[fieldName], fieldRules, fieldName);
    if (error) {
      errors[fieldName] = error;
    }
  });

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Common validation rules
 */
export const commonRules = {
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  password: {
    required: true,
    minLength: 8,
    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
  },
  phone: {
    pattern: /^[\+]?[1-9][\d]{0,15}$/,
  },
  required: {
    required: true,
  },
  optional: {},
};

/**
 * Validate template data
 */
export function validateTemplate(data: any): ValidationResult {
  const rules = {
    title: { required: true, minLength: 1, maxLength: 100 },
    category: { required: true },
    type: { required: true },
    description: { maxLength: 500 },
  };

  return validateObject(data, rules);
}

/**
 * Validate customer data
 */
export function validateCustomer(data: any): ValidationResult {
  const rules = {
    name: { required: true, minLength: 1, maxLength: 100 },
    email: commonRules.email,
    phone: commonRules.phone,
  };

  return validateObject(data, rules);
}

/**
 * Validate order data
 */
export function validateOrder(data: any): ValidationResult {
  const rules = {
    customerId: { required: true },
    items: {
      required: true,
      custom: (value: any) => {
        if (!Array.isArray(value) || value.length === 0) {
          return 'At least one item is required';
        }
        return true;
      },
    },
  };

  return validateObject(data, rules);
}
