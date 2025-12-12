import { Client } from "../models/Client";

// MOCK DATA - Replace with real API call when backend is ready
const MOCK_CLIENTS: Client[] = [
  {
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
  },
  {
    id: "2",
    therapistId: "therapist-1",
    email: "jane.smith@example.com",
    alias: "JANE_SMITH",
    firstName: "Jane",
    lastName: "D.",
    ageGroup: "26-40",
    gender: "female",
    riskLevel: "low",
    tags: ["Depression"],
    createdAt: "2024-02-20T14:30:00Z",
    updatedAt: "2024-02-20T14:30:00Z",
  },
  {
    id: "3",
    therapistId: "therapist-1",
    email: "alex.jones@example.com",
    alias: "ALEX_JONES",
    firstName: "Alex",
    lastName: "J.",
    ageGroup: "10-17",
    gender: "non-binary",
    riskLevel: "high",
    tags: ["Family Conflict", "School Issues"],
    createdAt: "2024-03-10T09:15:00Z",
    updatedAt: "2024-03-10T09:15:00Z",
  },
  {
    id: "4",
    therapistId: "therapist-1",
    email: "sarah.w@example.com",
    alias: "SARAH_WILLIAMS",
    firstName: "Sarah",
    lastName: "W.",
    ageGroup: "40-60",
    gender: "female",
    riskLevel: "medium",
    tags: ["Trauma", "EMDR"],
    createdAt: "2024-04-05T16:45:00Z",
    updatedAt: "2024-04-05T16:45:00Z",
  },
  {
    id: "5",
    therapistId: "therapist-1",
    email: "robert.b@example.com",
    alias: "ROBERT_BROWN",
    firstName: "Robert",
    lastName: "B.",
    ageGroup: "60+",
    gender: "male",
    riskLevel: "low",
    tags: ["Retirement Adjustment"],
    notes: "Adapting well to retirement lifestyle changes.",
    createdAt: "2024-05-12T11:20:00Z",
    updatedAt: "2024-05-12T11:20:00Z",
  },
];

export async function getClient(id: string): Promise<Client> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  // TODO: Replace with real API call when backend is ready
  // const { data } = await axios.get<Client>(`/api/clients/${id}`);
  // return data;

  const client = MOCK_CLIENTS.find((c) => c.id === id);
  if (!client) {
    throw new Error("Client not found");
  }
  return client;
}

export async function getClientProfile(): Promise<Client> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  // TODO: Replace with real API call when backend is ready
  // const { data } = await axios.get<Client>('/api/clients/me');
  // return data;

  return MOCK_CLIENTS[0];
}
