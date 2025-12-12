import axios from "@/lib/axios";
import { Client, AgeGroup } from "../models/Client";

export interface GetClientsParams {
  therapistId: string;
  page?: number;
  limit?: number;
}

export interface GetClientsResponse {
  data: Client[];
  total: number;
  page: number;
  limit: number;
}

// Backend response structure
interface BackendClientData {
  id: string;
  alias: string;
  age_group: string;
  gender?: string;
  tags?: string[];
  background_notes?: string;
  risk_level?: string;
}

interface BackendGetClientsResponse {
  statusCode: number;
  message: string;
  error: string;
  data: BackendClientData[];
}

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

// Transform backend client to frontend Client type
const transformBackendClient = (
  backendClient: BackendClientData,
  therapistId: string
): Client => {
  return {
    id: backendClient.id,
    therapistId: therapistId,
    email: "", // Email not provided by backend
    alias: backendClient.alias,
    ageGroup: transformBackendAgeGroup(backendClient.age_group),
    gender: backendClient.gender as Client["gender"],
    riskLevel: backendClient.risk_level as Client["riskLevel"],
    tags: backendClient.tags,
    notes: backendClient.background_notes,
    createdAt: new Date().toISOString(), // Backend doesn't provide timestamps
    updatedAt: new Date().toISOString(),
  };
};

export async function getClients(
  params: GetClientsParams
): Promise<GetClientsResponse> {
  // Make API call to backend
  const response = await axios.get<BackendGetClientsResponse>(
    "/therapist/all-clients"
  );

  // Transform backend data to frontend format
  const clients = response.data.data.map((backendClient) =>
    transformBackendClient(backendClient, params.therapistId)
  );

  // Backend doesn't support pagination yet, so we return all data
  return {
    data: clients,
    total: clients.length,
    page: params.page || 1,
    limit: params.limit || clients.length,
  };
}
