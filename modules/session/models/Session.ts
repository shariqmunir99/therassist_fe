export interface Session {
  id: string;
  clientId: string;
  therapistId: string;
  sessionDate: string;
  duration: string | number;
  status: string;
  session_number: number;
  processing_state: string;
  notes?: string;
  audioUrl?: string;
  theme?: string;
  theme_explanation?: string | null;
  hasTranscription?: boolean;
  createdAt?: string;
  updatedAt?: string;
  alias?: string;
  sentiment_score?: string;
  therapist_count?: number;
  client_count?: number;
  therapist_time?: string;
  client_time?: string;
}

export interface SessionFormData {
  clientId: string;
  sessionDate: string;
  duration: number;
  notes?: string;
  audioFile?: File;
}
