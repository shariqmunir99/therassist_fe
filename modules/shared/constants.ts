export const APP_NAME = 'Therassist';
export const APP_DESCRIPTION = 'AI-powered therapy session management platform';

export const API_BASE_URL = process.env.API_URL || 'http://localhost:3001';

export const ROLES = {
  THERAPIST: 'therapist',
  CLIENT: 'client',
  ADMIN: 'admin',
} as const;

export const SESSION_STATUS = {
  SCHEDULED: 'scheduled',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
  NO_SHOW: 'no-show',
} as const;

export const SPECIALIZATIONS = [
  'Anxiety',
  'Depression',
  'Trauma',
  'Relationships',
  'Stress Management',
  'Family Therapy',
  'Child Therapy',
  'Addiction',
  'Grief',
  'Eating Disorders',
] as const;

export const DAYS_OF_WEEK = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
] as const;
