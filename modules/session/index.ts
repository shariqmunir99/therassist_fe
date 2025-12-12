/**
 * Session Module - Public Exports
 *
 * This module manages therapy sessions
 */

// Components
export { ClientSessionsTable } from "./components/ClientSessionsTable";
export { UploadSessionModal } from "./components/UploadSessionModal";

// Hooks
export {
  useSessions,
  useSession,
  useClientSessions,
  useSessionInsights,
  useUploadSession,
  useUpdateSessionNotes,
  useTranscription,
  useRequestTranscription,
} from "./hooks/useSession";

// Types
export type { Session, SessionFormData } from "./models/Session";
export type { SessionInsights } from "./models/SessionInsights";
