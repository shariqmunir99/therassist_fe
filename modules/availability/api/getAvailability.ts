import axios from '@/lib/axios';
import { Availability } from '../models/Availability';

export async function getAvailability(therapistId: string): Promise<Availability[]> {
  const { data } = await axios.get<Availability[]>(
    `/api/therapists/${therapistId}/availability`
  );
  return data;
}

export async function getMyAvailability(): Promise<Availability[]> {
  const { data } = await axios.get<Availability[]>('/api/availability/me');
  return data;
}
