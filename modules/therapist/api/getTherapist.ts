import axios from '@/lib/axios';
import { Therapist } from '../models/Therapist';

export async function getTherapist(id: string): Promise<Therapist> {
  const { data } = await axios.get<Therapist>(`/api/therapists/${id}`);
  return data;
}

export async function getTherapistProfile(): Promise<Therapist> {
  const { data } = await axios.get<Therapist>('/api/therapists/me');
  return data;
}
