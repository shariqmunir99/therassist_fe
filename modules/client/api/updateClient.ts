import { Client, ClientFormData } from "../models/Client";

export interface UpdateClientPayload extends Partial<ClientFormData> {
  id: string;
}

export async function updateClient(
  payload: UpdateClientPayload
): Promise<Client> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // TODO: Replace with real API call when backend is ready
  // const { id, ...data } = payload;
  // const response = await axios.put<Client>(`/api/clients/${id}`, data);
  // return response.data;

  // Mock implementation - just return updated data
  const updatedClient: Client = {
    id: payload.id,
    therapistId: "therapist-1",
    email: payload.email || "updated@example.com",
    alias: payload.alias || "UPDATED_CLIENT",
    ageGroup: payload.ageGroup || "18-25",
    gender: payload.gender,
    riskLevel: payload.riskLevel,
    tags: payload.tags,
    notes: payload.notes,
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  };

  return updatedClient;
}
