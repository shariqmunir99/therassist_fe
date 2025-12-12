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
  // TODO: Uncomment when backend is ready
  // const { data } = await axios.get<Session>(`/api/sessions/${id}`);
  // return data;

  // Mock data for development
  return Promise.resolve({
    id,
    clientId: "Jane Doe",
    therapistId: "therapist-1",
    sessionDate: "2023-10-26T10:00:00Z",
    duration: 60,
    status: "completed",
    notes:
      "Patient shows progress in identifying negative thought patterns. Continue exploring cognitive restructuring techniques. Follow up on manager relationship dynamics next session. Consider introducing mindfulness exercises to manage work-related anxiety.",
    audioUrl: "",
    hasTranscription: true,
    createdAt: "2023-10-26T10:00:00Z",
    updatedAt: "2023-10-26T11:00:00Z",
  });
}
