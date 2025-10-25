import { api } from "@/api/config/axios";
import type { Universe } from "./types";

export const getUniverse = async ({
  page = 1,
  limit = 10,
}: {
  page?: number;
  limit?: number;
}) => {
  const response = await api.get("/content/universe", {
    params: { page, limit },
  });
  return response.data.data.data as Universe[];
};
