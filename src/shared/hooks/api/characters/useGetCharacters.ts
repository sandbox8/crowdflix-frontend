import { useQuery } from "@tanstack/react-query";
import { getCharacters } from "@/api/characters/getCharacters";

export const useGetCharacters = ({
  page = 1,
  limit = 14,
}: {
  page?: number;
  limit?: number;
}) => {
  return useQuery({
    queryKey: ["characters", page, limit],
    queryFn: () => getCharacters({ page, limit }),
  });
};
