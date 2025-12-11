/**
 * Client Module - Public Exports
 *
 * This module manages client profiles for therapists
 */

// Components
export { ClientCard } from "./components/ClientCard";
export { ClientForm } from "./components/ClientForm";
export { CreateClientModal } from "./components/CreateClientModal";
export { EditClientModal } from "./components/EditClientModal";
export { ClientInsights } from "./components/insights";

// Hooks
export { useClient, useClientProfile } from "./hooks/useClient";
export {
  useClients,
  useCreateClient,
  useUpdateClient,
  useDeleteClient,
} from "./hooks/useClients";

// Types
export type { Client, ClientFormData, AgeGroup } from "./models/Client";
export { AGE_GROUPS } from "./models/Client";
export type {
  ClientInsightsData,
  SentimentDataPoint,
  EmotionDistribution,
  TherapeuticTheme,
  KeywordData,
  RiskFlag,
} from "./models/ClientInsights";
