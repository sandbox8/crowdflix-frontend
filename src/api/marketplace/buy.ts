import { api } from "../config/axios";
export interface Buy {
  listing_id: string;
  price: string;
  tx_hash: string;
}
export const buy = async ({ listing_id, price, tx_hash }: Buy) => {
  const response = await api.post(`/nfts/marketplace/buy`, {
    listing_id,
    price,
    tx_hash,
  });
  return response.data.data;
};
