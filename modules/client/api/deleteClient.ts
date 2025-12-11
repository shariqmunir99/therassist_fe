export async function deleteClient(id: string): Promise<void> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // TODO: Replace with real API call when backend is ready
  // await axios.delete(`/api/clients/${id}`);

  // Mock implementation - just simulate successful deletion
  console.log(`Mock: Deleted client ${id}`);
}
