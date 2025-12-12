import axios from "@/lib/axios";
import { Utterance } from "../models/Utterance";

/**
 * Payload for POST /api/Session/utterances
 */
export interface GetUtterancesPayload {
  session_id: string;
  page_no: number;
  page_size: number;
  // Future filter fields (not used in MVP)
  speaker?: "A" | "B" | "client" | "therapist";
  start_time?: string;
  end_time?: string;
  clinical_themes?: string[];
}

/**
 * Backend API response structure from POST /api/Session/utterances
 */
interface BackendUtterancesResponse {
  success: boolean;
  message: string;
  data: {
    utterances: Utterance[];
    hasMore: boolean;
  };
}

/**
 * Response structure from POST /api/Session/utterances (transformed for frontend)
 */
export interface GetUtterancesResponse {
  success: boolean;
  message: string;
  data: Utterance[];
  hasMore: boolean; // Indicates if there are more pages available
}

/**
 * Fetches paginated utterances for a session
 * @param payload - Request payload with session_id and pagination params
 * @returns Promise with utterances response
 */
export async function getUtterances(
  payload: GetUtterancesPayload
): Promise<GetUtterancesResponse> {
  const { data } = await axios.post<BackendUtterancesResponse>(
    "/Session/utterances",
    {
      session_id: payload.session_id,
      page_no: payload.page_no,
      page_size: payload.page_size,
      // Omit filter fields for MVP (backend doesn't support them yet)
      // speaker: payload.speaker,
      // start_time: payload.start_time,
      // end_time: payload.end_time,
      // clinical_themes: payload.clinical_themes,
    }
  );

  // Transform nested response to flat structure for frontend
  return {
    success: data.success,
    message: data.message,
    data: data.data.utterances,
    hasMore: data.data.hasMore,
  };
}
