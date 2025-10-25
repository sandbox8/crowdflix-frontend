import { api } from "../config/axios";

export const setupWallet = async (walletAddress: string) => {
  const response = await api.post("/users/setup-wallet", {
    wallet_address: walletAddress,
  });
  return response.data.data;
};
