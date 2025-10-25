import { useQuery } from "@tanstack/react-query";
import { getMe } from "@/api/users/getUsers";

export const useGetMe = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: getMe,
  });
};
