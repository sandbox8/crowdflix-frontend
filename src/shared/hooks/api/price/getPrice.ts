import { useQuery } from "@tanstack/react-query";
import { getPrice } from "@/api/price/getPrice";

export const useGetPrice = () => {
  return useQuery({
    queryKey: ["price"],
    queryFn: getPrice,
    refetchInterval: 60000,
  });
};
