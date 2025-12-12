import axios from "@/lib/axios";
import { Session } from "../models/Session";

interface BackendSession {
  id: string;
  session_number: number;
  session_date: string;
  duration: string;
  notes: string;
  processing_state: string;
  audio_url: string;
  theme: string;
  theme_explanation: string | null;
}

interface BackendResponse {
  statusCode: number;
  message: string;
  error: string;
  data: BackendSession[];
}

export async function getSessionsByClient(
  clientId: string,
  therapistId: string
): Promise<Session[]> {
  const { data } = await axios.get<BackendResponse>(
    `/Session/client/${clientId}`
  );

  // Transform backend data to frontend format
  return data.data.map((session) => ({
    id: session.id,
    clientId: clientId,
    therapistId: therapistId,
    sessionDate: session.session_date,
    duration: session.duration,
    status: session.processing_state,
    session_number: session.session_number,
    processing_state: session.processing_state,
    notes: session.notes,
    audioUrl: session.audio_url,
    theme: session.theme,
    theme_explanation: session.theme_explanation,
  }));
}
