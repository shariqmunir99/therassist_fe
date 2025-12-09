import axios from '@/lib/axios';

export interface Transcription {
  id: string;
  sessionId: string;
  text: string;
  segments: TranscriptionSegment[];
  status: 'pending' | 'processing' | 'completed' | 'failed';
  createdAt: string;
  updatedAt: string;
}

export interface TranscriptionSegment {
  start: number;
  end: number;
  text: string;
  speaker?: string;
}

export async function getTranscription(sessionId: string): Promise<Transcription> {
  const { data } = await axios.get<Transcription>(
    `/api/sessions/${sessionId}/transcription`
  );
  return data;
}

export async function requestTranscription(sessionId: string): Promise<void> {
  await axios.post(`/api/sessions/${sessionId}/transcription`);
}
