import { api } from "../config/axios";

export const setupWallet = async (tx_hash: string) => {
  const response = await api.post("/wallet/setup", {
    tx_hash,
    is_for_buy: true,
  });
  return response.data.data;
};
