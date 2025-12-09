import axios from '@/lib/axios';
import { Client } from '../models/Client';

export async function getClient(id: string): Promise<Client> {
  const { data } = await axios.get<Client>(`/api/clients/${id}`);
  return data;
}

export async function getClientProfile(): Promise<Client> {
  const { data } = await axios.get<Client>('/api/clients/me');
  return data;
}
