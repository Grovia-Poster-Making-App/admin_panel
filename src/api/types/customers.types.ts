// Customer related types
import { FilterOptions } from './common.types';

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  address?: Address;
  preferences: CustomerPreferences;
  stats: CustomerStats;
  status: CustomerStatus;
  createdAt: string;
  updatedAt: string;
  lastLogin?: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface CustomerPreferences {
  language: string;
  timezone: string;
  notifications: NotificationPreferences;
  theme: 'light' | 'dark' | 'auto';
}

export interface NotificationPreferences {
  email: boolean;
  sms: boolean;
  push: boolean;
  marketing: boolean;
}

export interface CustomerStats {
  totalOrders: number;
  totalSpent: number;
  averageOrderValue: number;
  lastOrderDate?: string;
  loyaltyPoints: number;
  referralCount: number;
}

export type CustomerStatus = 'active' | 'inactive' | 'suspended' | 'pending';

export interface CreateCustomerRequest {
  name: string;
  email: string;
  phone?: string;
  address?: Address;
  preferences?: Partial<CustomerPreferences>;
}

export interface UpdateCustomerRequest extends Partial<CreateCustomerRequest> {
  id: string;
  status?: CustomerStatus;
}

export interface CustomerFilters extends FilterOptions {
  status?: CustomerStatus;
  createdFrom?: string;
  createdTo?: string;
  minOrders?: number;
  maxOrders?: number;
  minSpent?: number;
  maxSpent?: number;
}
