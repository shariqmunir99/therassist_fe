import { useQuery } from "@tanstack/react-query";
import { getClientInsights } from "../api/getClientInsights";

export function useClientInsights(clientId: string) {
  return useQuery({
    queryKey: ["clientInsights", clientId],
    queryFn: () => getClientInsights(clientId),
    enabled: !!clientId,
  });
}
