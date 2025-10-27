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
  const response = await api.get<OrderStatusResponse>(`/payments/order/${orderId}`);
  
  // Map backend response to frontend format
  const order = response.data.data as any;
  
  // Determine NFT status based on blockchain_confirmed and blockchain_error
  let nft_status: "pending" | "minted" | "failed" = "pending";
  if (order.blockchain_confirmed) {
    nft_status = "minted";
  } else if (order.blockchain_error) {
    nft_status = "failed";
  }
  
  return {
    order_id: order.order_id,
    user_id: order.user_id,
    status: order.status,
    edition_id: order.edition_id,
    moment_id: order.edition?.moment_id,
    nft_status,
    created_at: order.created_at,
    paid_at: order.paid_at,
    error_message: order.blockchain_error,
  };
};
