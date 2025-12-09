export const ROUTES = {
  // Public routes
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  THERAPISTS: '/therapists',
  THERAPIST_PROFILE: (id: string) => `/therapists/${id}`,

  // Dashboard routes
  DASHBOARD: '/dashboard',
  
  // Therapist routes
  THERAPIST_CLIENTS: '/dashboard/therapists/clients',
  THERAPIST_SESSIONS: '/dashboard/therapists/sessions',
  THERAPIST_AVAILABILITY: '/dashboard/therapists/availability',
  THERAPIST_SETTINGS: '/dashboard/therapists/settings',
  
  // Client routes
  CLIENT_SESSIONS: '/dashboard/clients',
  CLIENT_FIND_THERAPISTS: '/therapists',
  
  // API routes
  API_AUTH: '/api/auth',
} as const;

export const PUBLIC_ROUTES = [
  ROUTES.HOME,
  ROUTES.LOGIN,
  ROUTES.SIGNUP,
  ROUTES.THERAPISTS,
];

export const PROTECTED_ROUTES = [
  ROUTES.DASHBOARD,
  ROUTES.THERAPIST_CLIENTS,
  ROUTES.THERAPIST_SESSIONS,
  ROUTES.THERAPIST_AVAILABILITY,
  ROUTES.THERAPIST_SETTINGS,
  ROUTES.CLIENT_SESSIONS,
];

export const THERAPIST_ROUTES = [
  ROUTES.THERAPIST_CLIENTS,
  ROUTES.THERAPIST_SESSIONS,
  ROUTES.THERAPIST_AVAILABILITY,
  ROUTES.THERAPIST_SETTINGS,
];

export const CLIENT_ROUTES = [
  ROUTES.CLIENT_SESSIONS,
  ROUTES.CLIENT_FIND_THERAPISTS,
];
