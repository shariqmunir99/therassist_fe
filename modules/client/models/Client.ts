export interface Client {
  id: string;
  userId: string;
  name: string;
  email: string;
  phone?: string;
  dateOfBirth?: string;
  emergencyContact?: {
    name: string;
    phone: string;
    relationship: string;
  };
  notes?: string;
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ClientFormData {
  name: string;
  phone?: string;
  dateOfBirth?: string;
  emergencyContact?: {
    name: string;
    phone: string;
    relationship: string;
  };
}
