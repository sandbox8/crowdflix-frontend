import { api } from "../config/axios";

export interface OrderStatus {
  order_id: string;
  user_id: string;
  status: "pending" | "paid" | "failed" | "cancelled";
  edition_id?: string;
  moment_id?: string;
  nft_status?: "pending" | "minted" | "failed";
  created_at: string;
  paid_at?: string;
  error_message?: string;
}

export interface OrderStatusResponse {
  success: boolean;
  data: OrderStatus;
}

export const getOrderStatus = async (orderId: string): Promise<OrderStatus> => {
  const response = await api.get<OrderStatusResponse>(`/orders/${orderId}/status`);
  return response.data.data;
};
