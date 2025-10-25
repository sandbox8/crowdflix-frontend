import { useQuery } from "@tanstack/react-query";
import { getMoments } from "@/api/moments/getMoments";

export const useGetMoments = ({
  page = 1,
  limit = 10,
  sortBy = "created_at",
  sortOrder = "DESC",
  status,
  tier,
  search,
  characters,
  universe,
  price,
}: {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: string;
  status?: string;
  tier?: string;
  search?: string;
  characters?: string[];
  universe?: string[];
  price?: number;
}) => {
  return useQuery({
    queryKey: [
      "moments",
      page,
      limit,
      sortBy,
      sortOrder,
      status,
      tier,
      search,
      characters,
      universe,
      price,
      search,
    ],
    queryFn: () =>
      getMoments({
        page,
        limit,
        sortBy,
        sortOrder,
        status,
        tier,
        search,
        characters,
        universe,
        price,
      }),
  });
};
