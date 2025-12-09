import axios from '@/lib/axios';
import { Therapist } from '../models/Therapist';

export interface UpdateTherapistPayload {
  name?: string;
  bio?: string;
  specializations?: string[];
  hourlyRate?: number;
  phone?: string;
}

export async function updateTherapist(
  id: string,
  payload: UpdateTherapistPayload
): Promise<Therapist> {
  const { data } = await axios.patch<Therapist>(
    `/api/therapists/${id}`,
    payload
  );
  return data;
}
