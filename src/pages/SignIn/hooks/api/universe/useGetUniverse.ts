import { getUniverse } from "@/api/universe/getUniverse";
import { useQuery } from "@tanstack/react-query";

export const useGetUniverse = ({
  page = 1,
  limit = 4,
}: {
  page?: number;
  limit?: number;
}) => {
  return useQuery({
    queryKey: ["universe", page, limit],
    queryFn: () => getUniverse({ page, limit }),
  });
};
