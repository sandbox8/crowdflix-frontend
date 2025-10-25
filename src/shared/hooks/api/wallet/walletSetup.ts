import { useMutation, useQueryClient } from "@tanstack/react-query";
import { setupWallet } from "@/api/wallet/setupWallet";

export const useWalletBloctoSetup = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: setupWallet,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });
};
