import apiClient from '../client';
import { API_ENDPOINTS } from '../endpoints';
import { ApiResponse, PaginatedResponse } from '../types';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  recipient: string;
  status: 'pending' | 'sent' | 'failed' | 'delivered';
  createdAt: string;
  sentAt?: string;
  readAt?: string;
}

export interface SendNotificationRequest {
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  recipients: string[];
  channels: ('email' | 'sms' | 'push')[];
  scheduledAt?: string;
}

export interface NotificationFilters {
  status?: string;
  type?: string;
  recipient?: string;
  dateFrom?: string;
  dateTo?: string;
  page?: number;
  limit?: number;
}

export const notificationsService = {
  // Get all notifications
  async getNotifications(filters?: NotificationFilters): Promise<PaginatedResponse<Notification>> {
    const response = await apiClient.get<PaginatedResponse<Notification>>(
      API_ENDPOINTS.NOTIFICATIONS.BASE,
      { params: filters }
    );
    return response.data;
  },

  // Send notification
  async sendNotification(notificationData: SendNotificationRequest): Promise<Notification> {
    const response = await apiClient.post<ApiResponse<Notification>>(
      API_ENDPOINTS.NOTIFICATIONS.SEND,
      notificationData
    );
    return response.data.data;
  },

  // Get notification history
  async getNotificationHistory(filters?: NotificationFilters): Promise<PaginatedResponse<Notification>> {
    const response = await apiClient.get<PaginatedResponse<Notification>>(
      API_ENDPOINTS.NOTIFICATIONS.HISTORY,
      { params: filters }
    );
    return response.data;
  },

  // Mark notification as read
  async markAsRead(id: string): Promise<void> {
    await apiClient.patch(`${API_ENDPOINTS.NOTIFICATIONS.BASE}/${id}/read`);
  },

  // Mark all notifications as read
  async markAllAsRead(): Promise<void> {
    await apiClient.patch(`${API_ENDPOINTS.NOTIFICATIONS.BASE}/read-all`);
  },

  // Get unread count
  async getUnreadCount(): Promise<number> {
    const response = await apiClient.get<ApiResponse<{ count: number }>>(
      `${API_ENDPOINTS.NOTIFICATIONS.BASE}/unread-count`
    );
    return response.data.data.count;
  },

  // Delete notification
  async deleteNotification(id: string): Promise<void> {
    await apiClient.delete(`${API_ENDPOINTS.NOTIFICATIONS.BASE}/${id}`);
  },
};
