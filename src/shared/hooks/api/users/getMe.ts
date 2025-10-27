import { useQuery } from "@tanstack/react-query";
import { getMe } from "@/api/users/getUsers";

export const useGetMe = () => {
  // Only fetch user if we have a token (prevents 401 loops)
  const hasToken = !!localStorage.getItem("token");
  
  return useQuery({
    queryKey: ["me"],
    queryFn: getMe,
    enabled: hasToken,
    retry: false, // Don't retry if user is not authenticated
  });
};
