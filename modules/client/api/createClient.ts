import { Client, ClientFormData } from "../models/Client";

export interface CreateClientPayload extends ClientFormData {
  therapistId: string;
}

// In-memory storage for mock data
let mockClientsStore: Client[] = [];

export async function createClient(
  payload: CreateClientPayload
): Promise<Client> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // TODO: Replace with real API call when backend is ready
  // const { data } = await axios.post<Client>("/api/clients", payload);
  // return data;

  // Check for duplicate alias (simulate backend validation)
  const existingClient = mockClientsStore.find(
    (c) =>
      c.alias.toLowerCase() === payload.alias.toLowerCase() &&
      c.therapistId === payload.therapistId
  );

  if (existingClient) {
    throw {
      response: {
        status: 409,
        data: { message: "A client with this alias already exists" },
      },
    };
  }

  // Create new client
  const newClient: Client = {
    id: `client-${Date.now()}`,
    therapistId: payload.therapistId,
    email: payload.email,
    alias: payload.alias,
    ageGroup: payload.ageGroup,
    gender: payload.gender,
    riskLevel: payload.riskLevel,
    tags: payload.tags,
    notes: payload.notes,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  mockClientsStore.push(newClient);
  return newClient;
}
