import axios from '@/lib/axios';
import { Therapist } from '../models/Therapist';

export interface SearchTherapistsParams {
  query?: string;
  specialization?: string;
  minRate?: number;
  maxRate?: number;
  page?: number;
  limit?: number;
}

export interface SearchTherapistsResponse {
  data: Therapist[];
  total: number;
  page: number;
  limit: number;
}

export async function searchTherapists(
  params: SearchTherapistsParams
): Promise<SearchTherapistsResponse> {
  const { data } = await axios.get<SearchTherapistsResponse>(
    '/api/therapists',
    { params }
  );
  return data;
}
