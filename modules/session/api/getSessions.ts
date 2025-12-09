import axios from '@/lib/axios';
import { Session } from '../models/Session';

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
  const { data } = await axios.get<GetSessionsResponse>('/api/sessions', {
    params,
  });
  return data;
}

export async function getSession(id: string): Promise<Session> {
  const { data } = await axios.get<Session>(`/api/sessions/${id}`);
  return data;
}
