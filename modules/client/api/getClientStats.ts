import type { ClientStats } from "../models/ClientStats";

/**
 * Fetches client statistics
 * TODO: Replace with actual API call when backend is ready
 *
 * Future implementation:
 * export async function getClientStats(clientId: string): Promise<ClientStats> {
 *   const { data } = await axios.get(`/api/clients/${clientId}/stats`);
 *   return data;
 * }
 */
export async function getClientStats(clientId: string): Promise<ClientStats> {
  // Mock data for development
  return Promise.resolve({
    totalSessions: 12,
    lastSessionDate: "2023-10-26",
    pendingCount: 2,
  });
}
