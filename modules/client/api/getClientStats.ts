import axios from "@/lib/axios";
import type { ClientStats } from "../models/ClientStats";

/**
 * Backend response structure for client stats
 */
interface BackendClientStatsResponse {
  statusCode: number;
  message: string;
  error: string;
  data: {
    totalSessionCount: number;
    processingCount: number;
    lastUploadedSessionDate: string | null;
  };
}

/**
 * Fetches client statistics from the backend
 * GET /therapist/client-stats/{clientId}
 */
export async function getClientStats(clientId: string): Promise<ClientStats> {
  const response = await axios.get<BackendClientStatsResponse>(
    `/therapist/client-stats/${clientId}`
  );
  return response.data.data;
}
