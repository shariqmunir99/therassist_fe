import type { ClientInsightsData } from "../models/ClientInsights";
import { generateMockInsights } from "./mockInsightsData";

/**
 * Fetches client insights data
 * TODO: Replace with actual API call when backend is ready
 *
 * Future implementation:
 * export async function getClientInsights(clientId: string): Promise<ClientInsightsData> {
 *   const { data } = await axios.get(`/api/clients/${clientId}/insights`);
 *   return data;
 * }
 */
export async function getClientInsights(
  clientId: string
): Promise<ClientInsightsData> {
  // Mock async behavior
  return Promise.resolve(generateMockInsights(clientId));
}
