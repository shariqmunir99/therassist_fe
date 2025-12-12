import axios from "@/lib/axios";
import { Client, AgeGroup } from "../models/Client";

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

interface BackendGetClientResponse {
  statusCode: number;
  message: string;
  error: string;
  data: BackendClientData;
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
const transformBackendClient = (backendClient: BackendClientData): Client => {
  return {
    id: backendClient.id,
    therapistId: "", // Backend doesn't provide therapistId in single client response
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

export async function getClient(id: string): Promise<Client> {
  // Make API call to backend
  const response = await axios.get<BackendGetClientResponse>(
    `/therapist/client/${id}`
  );

  // Transform backend data to frontend format
  return transformBackendClient(response.data.data);
}

export async function getClientProfile(): Promise<Client> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  // TODO: Replace with real API call when backend is ready
  // const { data } = await axios.get<Client>('/api/clients/me');
  // return data;

  // Mock data for client portal (not therapist portal)
  const mockClient: Client = {
    id: "1",
    therapistId: "therapist-1",
    email: "john.doe@example.com",
    alias: "JOHN_DOE",
    firstName: "John",
    lastName: "D.",
    ageGroup: "18-25",
    gender: "male",
    riskLevel: "medium",
    tags: ["Anxiety", "CBT"],
    notes: "Patient showing good progress with CBT techniques.",
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
  };

  return mockClient;
}
