export interface Session {
  id: string;
  clientId: string;
  therapistId: string;
  sessionDate: string;
  duration: number;
  status: 'scheduled' | 'completed' | 'cancelled' | 'no-show';
  notes?: string;
  audioUrl?: string;
  hasTranscription: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SessionFormData {
  clientId: string;
  sessionDate: string;
  duration: number;
  notes?: string;
  audioFile?: File;
}
