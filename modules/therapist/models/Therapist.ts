export interface Therapist {
  id: string;
  userId: string;
  name: string;
  email: string;
  phone?: string;
  bio?: string;
  specializations: string[];
  credentials: string[];
  hourlyRate: number;
  rating?: number;
  totalSessions?: number;
  isVerified: boolean;
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface TherapistFormData {
  name: string;
  bio: string;
  specializations: string[];
  credentials: string[];
  hourlyRate: number;
  phone?: string;
}
