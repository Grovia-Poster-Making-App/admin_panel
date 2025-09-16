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
  } = useApi<{
    success: boolean;
    message: string;
    data?: {
      users: any[];
      pagination: {
        currentPage: number;
        totalPages: number;
        totalUsers: number;
        hasNextPage: boolean;
        hasPrevPage: boolean;
      };
    };
  }>(
    () => customersService.getCustomers(1, 10),
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
  } = useApi<{
    success: boolean;
    message: string;
    data?: { user: any };
  }>(customersService.updateCustomer);

  const {
    loading: deletingCustomer,
    error: deleteError,
    execute: deleteCustomer,
  } = useApi<{ success: boolean; message: string }>(customersService.deleteCustomer);

  // Update customers when data changes
  useEffect(() => {
    if (customersData && customersData.success && customersData.data) {
      // Transform API data to Customer format
      const transformedCustomers: Customer[] = customersData.data.users.map((user: any) => ({
        id: user._id,
        name: user.name,
        email: user.phoneNumber,
        phone: user.phoneNumber,
        avatar: '',
        preferences: {
          language: 'en',
          timezone: 'UTC',
          notifications: {
            email: true,
            sms: true,
            push: true,
            marketing: false
          },
          theme: 'light' as const
        },
        stats: {
          totalOrders: 0,
          totalSpent: 0,
          averageOrderValue: 0,
          loyaltyPoints: 0,
          referralCount: 0
        },
        status: 'active' as const,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      }));
      setCustomers(transformedCustomers);
      setPagination({
        page: customersData.data.pagination.currentPage,
        limit: 10,
        total: customersData.data.pagination.totalUsers,
        totalPages: customersData.data.pagination.totalPages
      });
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

  const handleUpdateCustomer = useCallback(async (id: string, customerData: any) => {
    try {
      const result = await updateCustomer(id, customerData);
      if (result && result.success && result.data) {
        const updatedCustomer = result.data.user;
        setCustomers(prev => prev.map(customer => 
          customer.id === id ? {
            id: updatedCustomer._id,
            name: updatedCustomer.name,
            email: updatedCustomer.phoneNumber,
            phone: updatedCustomer.phoneNumber,
            avatar: '',
            preferences: {
              language: 'en',
              timezone: 'UTC',
              notifications: {
                email: true,
                sms: true,
                push: true,
                marketing: false
              },
              theme: 'light' as const
            },
            stats: {
              totalOrders: 0,
              totalSpent: 0,
              averageOrderValue: 0,
              loyaltyPoints: 0,
              referralCount: 0
            },
            status: 'active' as const,
            createdAt: updatedCustomer.createdAt,
            updatedAt: updatedCustomer.updatedAt
          } : customer
        ));
        return updatedCustomer;
      }
      throw new Error('Update failed');
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
  } = useApi<{ success: boolean; message: string; data?: { user: any } }>(() => customersService.getCustomer(id), { immediate: true });

  return {
    customer,
    loading,
    error,
    refetch: fetchCustomer,
  };
}
