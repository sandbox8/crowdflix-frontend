import { api } from "../config/axios";

export interface CreateCheckoutDto {
  edition_id: string;
  listing_id: string;
  amount: string;
  currency?: string;
  payment_method?: "stripe" | "crypto";
}

export interface CheckoutSessionResponse {
  success: boolean;
  message: string;
  data: {
    checkoutUrl: string; // Stripe Checkout URL
    orderId: string;
  };
}

export const createCheckoutSession = async (
  dto: CreateCheckoutDto
): Promise<CheckoutSessionResponse> => {
  const response = await api.post<CheckoutSessionResponse>(
    "/payments/checkout",
    dto
  );
  return response.data;
};

