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
export { ClientStatsCards } from "./components/ClientStatsCards";

// Hooks
export { useClient, useClientProfile } from "./hooks/useClient";
export {
  useClients,
  useCreateClient,
  useUpdateClient,
  useDeleteClient,
} from "./hooks/useClients";
export { useClientStats } from "./hooks/useClientStats";
export { useClientInsights } from "./hooks/useClientInsights";

// Types
export type { Client, ClientFormData, AgeGroup } from "./models/Client";
export { AGE_GROUPS } from "./models/Client";
export type { ClientStats } from "./models/ClientStats";
export type {
  ClientInsightsData,
  SentimentDataPoint,
  EmotionDistribution,
  TherapeuticTheme,
  KeywordData,
  RiskFlag,
} from "./models/ClientInsights";
