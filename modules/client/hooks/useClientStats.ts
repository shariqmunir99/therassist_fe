import { useQuery } from "@tanstack/react-query";
import { getClientStats } from "../api/getClientStats";

export function useClientStats(clientId: string) {
  return useQuery({
    queryKey: ["clientStats", clientId],
    queryFn: () => getClientStats(clientId),
    enabled: !!clientId,
  });
}
