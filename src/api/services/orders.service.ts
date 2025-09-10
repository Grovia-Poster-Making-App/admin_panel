import apiClient from '../client';
import { API_ENDPOINTS } from '../endpoints';
import {
  Order,
  CreateOrderRequest,
  UpdateOrderRequest,
  OrderFilters,
  ApiResponse,
  PaginatedResponse,
} from '../types';

export const ordersService = {
  // Get all orders with filters
  async getOrders(filters?: OrderFilters): Promise<PaginatedResponse<Order>> {
    const response = await apiClient.get<PaginatedResponse<Order>>(
      API_ENDPOINTS.ORDERS.BASE,
      { params: filters }
    );
    return response.data;
  },

  // Get order by ID
  async getOrder(id: string): Promise<Order> {
    const response = await apiClient.get<ApiResponse<Order>>(
      API_ENDPOINTS.ORDERS.UPDATE(id)
    );
    return response.data.data;
  },

  // Create new order
  async createOrder(orderData: CreateOrderRequest): Promise<Order> {
    const response = await apiClient.post<ApiResponse<Order>>(
      API_ENDPOINTS.ORDERS.CREATE,
      orderData
    );
    return response.data.data;
  },

  // Update order
  async updateOrder(id: string, orderData: UpdateOrderRequest): Promise<Order> {
    const response = await apiClient.put<ApiResponse<Order>>(
      API_ENDPOINTS.ORDERS.UPDATE(id),
      orderData
    );
    return response.data.data;
  },

  // Delete order
  async deleteOrder(id: string): Promise<void> {
    await apiClient.delete(API_ENDPOINTS.ORDERS.DELETE(id));
  },

  // Get orders by customer
  async getOrdersByCustomer(customerId: string, filters?: OrderFilters): Promise<PaginatedResponse<Order>> {
    const response = await apiClient.get<PaginatedResponse<Order>>(
      API_ENDPOINTS.ORDERS.BY_CUSTOMER(customerId),
      { params: filters }
    );
    return response.data;
  },

  // Update order status
  async updateOrderStatus(id: string, status: string): Promise<Order> {
    const response = await apiClient.patch<ApiResponse<Order>>(
      `${API_ENDPOINTS.ORDERS.BASE}/${id}/status`,
      { status }
    );
    return response.data.data;
  },

  // Cancel order
  async cancelOrder(id: string, reason?: string): Promise<Order> {
    const response = await apiClient.patch<ApiResponse<Order>>(
      `${API_ENDPOINTS.ORDERS.BASE}/${id}/cancel`,
      { reason }
    );
    return response.data.data;
  },

  // Get order statistics
  async getOrderStats(filters?: OrderFilters): Promise<{
    totalOrders: number;
    totalRevenue: number;
    averageOrderValue: number;
    pendingOrders: number;
    completedOrders: number;
    cancelledOrders: number;
  }> {
    const response = await apiClient.get<ApiResponse<{
      totalOrders: number;
      totalRevenue: number;
      averageOrderValue: number;
      pendingOrders: number;
      completedOrders: number;
      cancelledOrders: number;
    }>>(
      `${API_ENDPOINTS.ORDERS.BASE}/stats`,
      { params: filters }
    );
    return response.data.data;
  },
};
