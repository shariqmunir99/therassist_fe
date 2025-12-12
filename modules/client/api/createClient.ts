import axios from "@/lib/axios";
import { Client, ClientFormData, AgeGroup } from "../models/Client";

export interface CreateClientPayload extends ClientFormData {
  therapistId: string;
}

// Backend payload structure
interface BackendCreateClientPayload {
  alias: string;
  age_group: string;
  gender?: string;
  tags?: string[];
  background_notes?: string;
  risk_level?: string;
}

// Backend response structure
interface BackendCreateClientResponse {
  statusCode: number;
  message: string;
  error: string;
  data: any; // Backend returns empty object for now
}

// Transform frontend age group to backend format
const transformAgeGroup = (ageGroup: AgeGroup): string => {
  const mapping: Record<AgeGroup, string> = {
    "10-17": "adolescent",
    "18-25": "young_adult",
    "26-40": "adult",
    "40-60": "middle_age",
    "60+": "senior",
  };
  return mapping[ageGroup];
};

// Transform backend age group to frontend format
const transformBackendAgeGroup = (backendAgeGroup: string): AgeGroup => {
  const mapping: Record<string, AgeGroup> = {
    adolescent: "10-17",
    young_adult: "18-25",
    adult: "26-40",
    middle_age: "40-60",
    senior: "60+",
  };
  return mapping[backendAgeGroup] || "26-40";
};

export async function createClient(
  payload: CreateClientPayload
): Promise<Client> {
  // Transform payload to backend format
  const backendPayload: BackendCreateClientPayload = {
    alias: payload.alias,
    age_group: transformAgeGroup(payload.ageGroup),
  };

  // Add optional fields only if they exist
  if (payload.gender) {
    backendPayload.gender = payload.gender;
  }
  if (payload.tags && payload.tags.length > 0) {
    backendPayload.tags = payload.tags;
  }
  if (payload.notes) {
    backendPayload.background_notes = payload.notes;
  }
  if (payload.riskLevel) {
    backendPayload.risk_level = payload.riskLevel;
  }

  // Make API call to backend
  const response = await axios.post<BackendCreateClientResponse>(
    "/therapist/client-profile",
    backendPayload
  );

  // Transform response back to frontend format
  // Note: Backend returns empty data object, so we construct the client from our payload
  const newClient: Client = {
    id: response.data.data?.id || `temp-${Date.now()}`, // Use temp ID if backend doesn't return one
    therapistId: payload.therapistId,
    email: payload.email || "",
    alias: payload.alias,
    ageGroup: payload.ageGroup,
    gender: payload.gender,
    riskLevel: payload.riskLevel,
    tags: payload.tags,
    notes: payload.notes,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  return newClient;
}
