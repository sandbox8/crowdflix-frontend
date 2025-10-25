import { useQuery } from "@tanstack/react-query";
import { getMyEditions } from "@/api/editions/getEditions";
import { useAppSelector } from "../../useRedux";

export const useGetMyEditions = (
  status?: string,
  tier?: string,
  search?: string,
) => {
  const { user } = useAppSelector((state) => state.user);
  return useQuery({
    queryKey: ["my-editions", user?.user_id, status, tier, search],
    queryFn: () => getMyEditions(user?.user_id || "", status, tier, search),
  });
};
