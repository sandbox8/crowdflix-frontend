import { useMutation, useQueryClient } from "@tanstack/react-query";
import { buy, type Buy } from "@/api/marketplace/buy";

export const useBuy = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["buy"],
    mutationFn: (data: Buy) => buy(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });
};
