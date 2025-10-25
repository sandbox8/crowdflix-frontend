import { sell } from "@/api/marketplace/sell";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useSell = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: sell,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });
};
