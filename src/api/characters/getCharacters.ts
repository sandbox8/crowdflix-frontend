import { api } from "../config/axios";
import type { Character } from "./type";

export const getCharacters = async ({
  page = 1,
  limit = 10,
}: {
  page?: number;
  limit?: number;
}) => {
  const response = await api.get("/content/characters", {
    params: { page, limit },
  });
  return response.data.data.data as Character[];
};
