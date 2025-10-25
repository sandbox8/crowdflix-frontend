import { api } from "../config/axios";
import type { Moment } from "./getMoments";

export const getMomentById = async (id: string): Promise<Moment> => {
  const response = await api.get(`/nfts/moments/${id}`);
  return response.data.data as Moment;
};
