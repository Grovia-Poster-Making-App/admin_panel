import apiClient from '../client';
import { API_ENDPOINTS } from '../endpoints';
import {
  Customer,
  CreateCustomerRequest,
  UpdateCustomerRequest,
  CustomerFilters,
  ApiResponse,
  PaginatedResponse,
} from '../types';

export const customersService = {
  // Get all customers with pagination
  async getCustomers(page: number = 1, limit: number = 10): Promise<{
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
  }> {
    const response = await apiClient.get<{
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
      API_ENDPOINTS.CUSTOMERS.BASE,
      { params: { page, limit } }
    );
    return response.data;
  },

  // Get customer by ID
  async getCustomer(id: string): Promise<{
    success: boolean;
    message: string;
    data?: { user: any };
  }> {
    const response = await apiClient.get<{
      success: boolean;
      message: string;
      data?: { user: any };
    }>(
      API_ENDPOINTS.CUSTOMERS.UPDATE(id)
    );
    return response.data;
  },

  // Create new customer
  async createCustomer(customerData: CreateCustomerRequest): Promise<Customer> {
    const response = await apiClient.post<ApiResponse<Customer>>(
      API_ENDPOINTS.CUSTOMERS.CREATE,
      customerData
    );
    return response.data.data;
  },

  // Update customer
  async updateCustomer(id: string, customerData: {
    name?: string;
    whatsappNumber?: string;
    gender?: 'male' | 'female' | 'other';
    images?: string[] | any[];
    rank?: string[];
    isPhoneVerified?: boolean;
    isWhatsAppVerified?: boolean;
  }): Promise<{
    success: boolean;
    message: string;
    data?: { user: any };
  }> {
    const response = await apiClient.put<{
      success: boolean;
      message: string;
      data?: { user: any };
    }>(
      API_ENDPOINTS.CUSTOMERS.UPDATE(id),
      customerData
    );
    return response.data;
  },

  // Delete customer
  async deleteCustomer(id: string): Promise<{
    success: boolean;
    message: string;
  }> {
    const response = await apiClient.delete<{
      success: boolean;
      message: string;
    }>(API_ENDPOINTS.CUSTOMERS.DELETE(id));
    return response.data;
  },

  // Search customers
  async searchCustomers(query: string, filters?: CustomerFilters): Promise<PaginatedResponse<Customer>> {
    const response = await apiClient.get<PaginatedResponse<Customer>>(
      API_ENDPOINTS.CUSTOMERS.SEARCH,
      { 
        params: { 
          q: query, 
          ...filters 
        } 
      }
    );
    return response.data;
  },

  // Get customer statistics
  async getCustomerStats(id: string): Promise<{
    totalOrders: number;
    totalSpent: number;
    averageOrderValue: number;
    lastOrderDate?: string;
    loyaltyPoints: number;
    referralCount: number;
  }> {
    const response = await apiClient.get<ApiResponse<{
      totalOrders: number;
      totalSpent: number;
      averageOrderValue: number;
      lastOrderDate?: string;
      loyaltyPoints: number;
      referralCount: number;
    }>>(
      `${API_ENDPOINTS.CUSTOMERS.BASE}/${id}/stats`
    );
    return response.data.data;
  },

  // Update customer status
  async updateCustomerStatus(id: string, status: 'active' | 'inactive' | 'suspended'): Promise<Customer> {
    const response = await apiClient.patch<ApiResponse<Customer>>(
      `${API_ENDPOINTS.CUSTOMERS.BASE}/${id}/status`,
      { status }
    );
    return response.data.data;
  },

  // Get customer orders
  async getCustomerOrders(id: string, filters?: any): Promise<PaginatedResponse<any>> {
    const response = await apiClient.get<PaginatedResponse<any>>(
      `${API_ENDPOINTS.CUSTOMERS.BASE}/${id}/orders`,
      { params: filters }
    );
    return response.data;
  },
};
