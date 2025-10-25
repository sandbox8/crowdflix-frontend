import { useMutation, useQueryClient } from "@tanstack/react-query";
import { setupWallet } from "@/api/users/setupWallet";

export const useSetupWallet = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: setupWallet,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });
};
