// Order related types
import { FilterOptions } from './common.types';

export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  customer: {
    id: string;
    name: string;
    email: string;
  };
  items: OrderItem[];
  pricing: OrderPricing;
  shipping: ShippingInfo;
  status: OrderStatus;
  payment: PaymentInfo;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
}

export interface OrderItem {
  id: string;
  productId: string;
  product: {
    id: string;
    name: string;
    description?: string;
    image?: string;
  };
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  options?: OrderItemOption[];
}

export interface OrderItemOption {
  name: string;
  value: string;
  price: number;
}

export interface OrderPricing {
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  total: number;
  currency: string;
}

export interface OrderAddress {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface ShippingInfo {
  method: string;
  address: OrderAddress;
  trackingNumber?: string;
  estimatedDelivery?: string;
  actualDelivery?: string;
}

export interface PaymentInfo {
  method: PaymentMethod;
  status: PaymentStatus;
  transactionId?: string;
  paidAt?: string;
  refundedAt?: string;
  refundAmount?: number;
}

export type OrderStatus = 
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'refunded';

export type PaymentMethod = 
  | 'credit_card'
  | 'debit_card'
  | 'paypal'
  | 'bank_transfer'
  | 'cash_on_delivery';

export type PaymentStatus = 
  | 'pending'
  | 'processing'
  | 'completed'
  | 'failed'
  | 'refunded'
  | 'cancelled';

export interface CreateOrderRequest {
  customerId: string;
  items: Omit<OrderItem, 'id' | 'product'>[];
  shipping: ShippingInfo;
  notes?: string;
}

export interface UpdateOrderRequest {
  id: string;
  status?: OrderStatus;
  shipping?: Partial<ShippingInfo>;
  notes?: string;
}

export interface OrderFilters extends FilterOptions {
  status?: OrderStatus;
  paymentStatus?: PaymentStatus;
  customerId?: string;
  dateFrom?: string;
  dateTo?: string;
  minTotal?: number;
  maxTotal?: number;
}
