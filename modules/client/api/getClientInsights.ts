import type { ClientInsightsData } from "../models/ClientInsights";
import { generateMockInsights } from "./mockInsightsData";

/**
 * Fetches client insights data
 * TODO: Replace with actual API call when backend is ready
 *
 * Future implementation:
 * export async function getClientInsights(clientId: string): Promise<ClientInsightsData> {
 *   const response = await apiClient.get(`/clients/${clientId}/insights`);
 *   return response.data;
 * }
 */
export function getClientInsights(clientId: string): ClientInsightsData {
  // Currently returning mock data
  // In the future, this will be an async function making an API call
  return generateMockInsights(clientId);
}
