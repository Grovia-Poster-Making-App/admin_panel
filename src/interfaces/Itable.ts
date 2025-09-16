export interface ItopCustomers extends Object {
  username: string;
  order: number;
  price: string;
}

export type TlatestTransactions = {
  orderId: string;
  customer: string;
  totalPrice: string;
  date: string;
  status: string;
};

export interface IcustomersTable {
  ID: number | string;
  userName: string;
  avatar: string;
  email: string;
  phoneNumber: string;
  totalOrders: number;
  totalSpend: string;
  location: string;
  whatsappNumber?: string;
  gender?: string;
  isPhoneVerified?: boolean;
  isWhatsAppVerified?: boolean;
  createdAt?: string;
  rank?: string[];
}

export interface IProductsTable {
  ID: number | string;
  pic: string;
  product: string;
  inventory: number;
  price: string;
  category: string;
}

export interface IOrdersTable {
  ID: number | string;
  customerName: string;
  customerAvatar: string;
  templateName: string;
  templateCategory: string;
  templatePreview: string;
  orderDate: string;
  totalAmount: string;
  status: string;
  paymentStatus: string;
}

export type complex =
  | ItopCustomers
  | TlatestTransactions
  | IcustomersTable
  | IProductsTable
  | IOrdersTable;

export interface Itable {
  limit?: number;
  selectedCategory?: string;
  headData: string[];
  bodyData: (
    | ItopCustomers
    | TlatestTransactions
    | IcustomersTable
    | IProductsTable
    | IOrdersTable
  )[];
  onSort?: (column: string) => void;
  sortBy?: string | null;
  sortOrder?: "asc" | "desc";
}
