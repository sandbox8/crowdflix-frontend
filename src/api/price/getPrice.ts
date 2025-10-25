import { api } from "../config/axios";

export const getPrice = async (): Promise<number> => {
  const response = await api.get("/wallet/flow-price");
  return response.data.usd;
};
