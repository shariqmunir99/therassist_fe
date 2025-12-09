import axios from '@/lib/axios';
import { Session } from '../models/Session';

export interface UploadSessionPayload {
  clientId: string;
  therapistId: string;
  sessionDate: string;
  duration: number;
  notes?: string;
  audioFile?: File;
}

export async function uploadSession(
  payload: UploadSessionPayload
): Promise<Session> {
  const formData = new FormData();
  
  formData.append('clientId', payload.clientId);
  formData.append('therapistId', payload.therapistId);
  formData.append('sessionDate', payload.sessionDate);
  formData.append('duration', payload.duration.toString());
  
  if (payload.notes) {
    formData.append('notes', payload.notes);
  }
  
  if (payload.audioFile) {
    formData.append('audio', payload.audioFile);
  }

  const { data } = await axios.post<Session>('/api/sessions', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  
  return data;
}
