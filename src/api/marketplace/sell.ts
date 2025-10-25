import { api } from "../config/axios";

export interface Sell {
  edition_id: string;
  tx_hash: string;
}

export const sell = async ({ edition_id, tx_hash }: Sell) => {
  const response = await api.post(`/nfts/marketplace/user-listing`, {
    edition_id,

    tx_hash,
  });
  return response.data.data;
};
