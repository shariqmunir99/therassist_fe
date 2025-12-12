import axios from "@/lib/axios";
import { Session } from "../models/Session";

export interface GetSessionsParams {
  clientId?: string;
  therapistId?: string;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
}

export interface GetSessionsResponse {
  data: Session[];
  total: number;
  page: number;
  limit: number;
}

export async function getSessions(
  params: GetSessionsParams
): Promise<GetSessionsResponse> {
  // TODO: Uncomment when backend is ready
  // const { data } = await axios.get<GetSessionsResponse>('/api/sessions', {
  //   params,
  // });
  // return data;

  // Mock data for development
  const mockSessions: Session[] = [
    {
      id: "SES-012",
      clientId: params.clientId || "",
      therapistId: "therapist-1",
      sessionDate: "2023-10-26T10:00:00Z",
      duration: 45,
      status: "completed",
      session_number: 12,
      processing_state: "COMPLETED",
      hasTranscription: true,
      createdAt: "2023-10-26T10:00:00Z",
      updatedAt: "2023-10-26T11:00:00Z",
    },
    {
      id: "SES-011",
      clientId: params.clientId || "",
      therapistId: "therapist-1",
      sessionDate: "2023-10-19T10:00:00Z",
      duration: 50,
      status: "completed",
      session_number: 11,
      processing_state: "COMPLETED",
      hasTranscription: false,
      createdAt: "2023-10-19T10:00:00Z",
      updatedAt: "2023-10-19T11:00:00Z",
    },
    {
      id: "SES-010",
      clientId: params.clientId || "",
      therapistId: "therapist-1",
      sessionDate: "2023-10-12T10:00:00Z",
      duration: 45,
      status: "completed",
      session_number: 10,
      processing_state: "COMPLETED",
      hasTranscription: false,
      createdAt: "2023-10-12T10:00:00Z",
      updatedAt: "2023-10-12T11:00:00Z",
    },
    {
      id: "SES-009",
      clientId: params.clientId || "",
      therapistId: "therapist-1",
      sessionDate: "2023-10-05T10:00:00Z",
      duration: 55,
      status: "cancelled",
      session_number: 9,
      processing_state: "CANCELLED",
      hasTranscription: false,
      createdAt: "2023-10-05T10:00:00Z",
      updatedAt: "2023-10-05T11:00:00Z",
    },
  ];

  return Promise.resolve({
    data: mockSessions,
    total: mockSessions.length,
    page: params.page || 1,
    limit: params.limit || 10,
  });
}

export async function getSession(id: string): Promise<Session> {
  const { data } = await axios.get<{
    statusCode: number;
    message: string;
    error: string;
    data: {
      alias: string;
      id: string;
      session_number: number;
      session_date: string;
      duration: string;
      notes: string;
      processing_state: string;
      sentiment_score: string;
      theme: string;
      therapist_count: number;
      client_count: number;
      therapist_time: string;
      client_time: string;
      audio_url: string;
      theme_explanation: string | null;
    };
  }>(`/Session/${id}`);

  // Transform backend data to frontend format
  const session = data.data;
  return {
    id: session.id,
    clientId: session.alias, // Using alias as clientId for now
    therapistId: "", // Not provided by API
    sessionDate: session.session_date,
    duration: session.duration,
    status: session.processing_state,
    session_number: session.session_number,
    processing_state: session.processing_state,
    notes: session.notes,
    audioUrl: session.audio_url,
    theme: session.theme,
    theme_explanation: session.theme_explanation,
    alias: session.alias,
    sentiment_score: session.sentiment_score,
    therapist_count: session.therapist_count,
    client_count: session.client_count,
    therapist_time: session.therapist_time,
    client_time: session.client_time,
  };
}
