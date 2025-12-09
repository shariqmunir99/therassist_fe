export const APP_CONFIG = {
  name: 'Therassist',
  description: 'AI-powered therapy session management platform',
  version: '1.0.0',
  author: 'Therassist Team',
  url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
} as const;

export const API_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
  timeout: 30000, // 30 seconds
  retries: 3,
} as const;

export const AUTH_CONFIG = {
  sessionMaxAge: 30 * 24 * 60 * 60, // 30 days in seconds
  tokenRefreshInterval: 15 * 60 * 1000, // 15 minutes in milliseconds
  passwordMinLength: 8,
} as const;

export const FILE_UPLOAD_CONFIG = {
  maxFileSize: 100 * 1024 * 1024, // 100 MB
  allowedAudioFormats: ['.mp3', '.wav', '.m4a', '.ogg'],
  allowedImageFormats: ['.jpg', '.jpeg', '.png', '.gif', '.webp'],
} as const;

export const PAGINATION_CONFIG = {
  defaultPageSize: 10,
  maxPageSize: 100,
  pageSizeOptions: [10, 25, 50, 100],
} as const;

export const FEATURE_FLAGS = {
  enableAITranscription: true,
  enableVideoSessions: false,
  enableGroupSessions: false,
  enablePayments: false,
} as const;
