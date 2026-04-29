export type OrderStatus =
  | 'pending_payment'
  | 'processing'
  | 'awaiting_sample'
  | 'in_lab'
  | 'ready'
  | 'cancelled';

export interface OrderItem {
  testId: string;
  testName: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  createdAt: string;
  status: OrderStatus;
  items: OrderItem[];
  amount: number;
  labLocation: string;
  resultPdf?: string;
}

export interface OrdersState {
  orders: Order[];
  filters: { status: OrderStatus | null };
  pagination: { currentPage: number; perPage: number };
}
