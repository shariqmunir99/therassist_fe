export interface Availability {
  id: string;
  therapistId: string;
  dayOfWeek: 0 | 1 | 2 | 3 | 4 | 5 | 6; // 0 = Sunday, 6 = Saturday
  startTime: string; // HH:mm format
  endTime: string; // HH:mm format
  isRecurring: boolean;
  specificDate?: string; // For one-time availability
  createdAt: string;
  updatedAt: string;
}

export interface AvailabilityFormData {
  dayOfWeek?: number;
  startTime: string;
  endTime: string;
  isRecurring: boolean;
  specificDate?: string;
}

export interface TimeSlot {
  start: string;
  end: string;
  available: boolean;
}
