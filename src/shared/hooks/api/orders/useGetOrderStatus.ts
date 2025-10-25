import { useQuery } from "@tanstack/react-query";
import { getOrderStatus } from "@/api/orders/getOrderStatus";

export const useGetOrderStatus = (
  orderId: string,
  options?: {
    enabled?: boolean;
    refetchInterval?: number | false | ((query: any) => number | false);
    retry?: boolean | number;
  }
) => {
  return useQuery({
    queryKey: ["order-status", orderId],
    queryFn: () => getOrderStatus(orderId),
    enabled: !!orderId && (options?.enabled !== false),
    refetchInterval: options?.refetchInterval,
    retry: options?.retry ?? 3,
  });
};
