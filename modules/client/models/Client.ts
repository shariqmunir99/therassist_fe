export type AgeGroup =
  | "10-17" // Adolescent
  | "18-25" // Young Adult
  | "26-40" // Adult
  | "40-60" // Middle Age
  | "60+"; // Senior

export const AGE_GROUPS: { value: AgeGroup; label: string }[] = [
  { value: "10-17", label: "10–17 (Adolescent)" },
  { value: "18-25", label: "18–25 (Young Adult)" },
  { value: "26-40", label: "26–40 (Adult)" },
  { value: "40-60", label: "40–60 (Middle Age)" },
  { value: "60+", label: "60+" },
];

export type RiskLevel = "low" | "medium" | "high";

export const RISK_LEVELS: { value: RiskLevel; label: string; color: string }[] =
  [
    { value: "low", label: "Low Risk", color: "green" },
    { value: "medium", label: "Medium Risk", color: "yellow" },
    { value: "high", label: "High Risk", color: "red" },
  ];

export type Gender = "male" | "female" | "non-binary" | "prefer-not-to-say";

export const GENDERS: { value: Gender; label: string }[] = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "non-binary", label: "Non-binary" },
  { value: "prefer-not-to-say", label: "Prefer not to say" },
];

export interface Client {
  id: string;
  therapistId: string;
  email: string;
  alias: string; // Unique alias/code for the client
  firstName?: string; // Optional first name for display
  lastName?: string; // Optional last name for display
  ageGroup: AgeGroup;
  gender?: Gender;
  riskLevel?: RiskLevel;
  tags?: string[];
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ClientFormData {
  email?: string; // Temporarily optional - backend not accepting it yet
  alias: string;
  ageGroup: AgeGroup;
  gender?: Gender;
  riskLevel?: RiskLevel;
  tags?: string[];
  notes?: string;
}
