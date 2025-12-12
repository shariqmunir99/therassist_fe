export const APP_CONFIG = {
  name: "Therassist",
  description: "AI-powered therapy session management platform",
  version: "1.0.0",
  author: "Therassist Team",
  url: process.env.API_URL || "http://localhost:3000",
} as const;

export const API_CONFIG = {
  baseUrl: process.env.API_URL || "http://localhost:3001/api/",
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
  allowedAudioFormats: [".mp3", ".wav", ".m4a", ".ogg"],
  allowedImageFormats: [".jpg", ".jpeg", ".png", ".gif", ".webp"],
  AUDIO_UPLOAD: {
    MIME_TYPES: {
      ".mp3": "audio/mpeg",
      ".wav": "audio/wav",
      ".m4a": "audio/mp4",
      ".mp4": "audio/mp4",
      ".aac": "audio/aac",
      ".flac": "audio/flac",
      ".ogg": "audio/ogg",
      ".webm": "audio/webm",
    },
    ALLOWED_EXTENSIONS: [
      ".mp3",
      ".wav",
      ".m4a",
      ".mp4",
      ".aac",
      ".flac",
      ".ogg",
      ".webm",
    ],
    MIN_FILE_SIZE: 5 * 1024 * 1024, // 5 MB
    MAX_FILE_SIZE: 500 * 1024 * 1024, // 500 MB
    MIN_DURATION_MIN: 5,
    MAX_DURATION_MIN: 90,
    MAX_NOTES_LENGTH: 1000,
  },
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
