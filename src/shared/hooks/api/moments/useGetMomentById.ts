import { useQuery } from "@tanstack/react-query";
import { getMomentById } from "@/api/moments/getMomentById";

export const useGetMomentById = (id: string) => {
  return useQuery({
    queryKey: ["moment", id],
    queryFn: () => getMomentById(id),
    enabled: !!id,
  });
};
