import { useState, useCallback, useEffect } from 'react';
import { useApi } from './useApi';
import { customersService } from '../api/services';
import {
  Customer,
  CreateCustomerRequest,
  UpdateCustomerRequest,
  CustomerFilters,
  PaginatedResponse,
} from '../api/types';

export function useCustomers(filters?: CustomerFilters) {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });

  const {
    data: customersData,
    loading: loadingCustomers,
    error: customersError,
    execute: fetchCustomers,
  } = useApi<PaginatedResponse<Customer>>(
    () => customersService.getCustomers(filters),
    { immediate: true }
  );

  const {
    loading: creatingCustomer,
    error: createError,
    execute: createCustomer,
  } = useApi<Customer>(customersService.createCustomer);

  const {
    loading: updatingCustomer,
    error: updateError,
    execute: updateCustomer,
  } = useApi<Customer>(customersService.updateCustomer);

  const {
    loading: deletingCustomer,
    error: deleteError,
    execute: deleteCustomer,
  } = useApi<void>(customersService.deleteCustomer);

  // Update customers when data changes
  useEffect(() => {
    if (customersData) {
      setCustomers(customersData.data);
      setPagination(customersData.pagination);
    }
  }, [customersData]);

  const handleCreateCustomer = useCallback(async (customerData: CreateCustomerRequest) => {
    try {
      const newCustomer = await createCustomer(customerData);
      setCustomers(prev => [newCustomer, ...prev]);
      return newCustomer;
    } catch (error) {
      throw error;
    }
  }, [createCustomer]);

  const handleUpdateCustomer = useCallback(async (id: string, customerData: UpdateCustomerRequest) => {
    try {
      const updatedCustomer = await updateCustomer(id, customerData);
      setCustomers(prev => prev.map(customer => 
        customer.id === id ? updatedCustomer : customer
      ));
      return updatedCustomer;
    } catch (error) {
      throw error;
    }
  }, [updateCustomer]);

  const handleDeleteCustomer = useCallback(async (id: string) => {
    try {
      await deleteCustomer(id);
      setCustomers(prev => prev.filter(customer => customer.id !== id));
    } catch (error) {
      throw error;
    }
  }, [deleteCustomer]);

  const refreshCustomers = useCallback(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  return {
    // Data
    customers,
    pagination,
    
    // Loading states
    loading: loadingCustomers,
    creating: creatingCustomer,
    updating: updatingCustomer,
    deleting: deletingCustomer,
    
    // Error states
    error: customersError,
    createError,
    updateError,
    deleteError,
    
    // Actions
    createCustomer: handleCreateCustomer,
    updateCustomer: handleUpdateCustomer,
    deleteCustomer: handleDeleteCustomer,
    refreshCustomers,
  };
}

export function useCustomer(id: string) {
  const {
    data: customer,
    loading,
    error,
    execute: fetchCustomer,
  } = useApi<Customer>(() => customersService.getCustomer(id), { immediate: true });

  return {
    customer,
    loading,
    error,
    refetch: fetchCustomer,
  };
}
