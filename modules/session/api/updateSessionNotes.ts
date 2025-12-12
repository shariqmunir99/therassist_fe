import axios from "@/lib/axios";

export interface UpdateSessionNotesParams {
  sessionId: string;
  notes: string;
}

export async function updateSessionNotes({
  sessionId,
  notes,
}: UpdateSessionNotesParams): Promise<void> {
  // TODO: Uncomment when backend is ready
  // await axios.patch(`/api/sessions/${sessionId}/notes`, { notes });

  // Mock implementation for development
  console.log("Updating notes for session:", sessionId, "Notes:", notes);
  return Promise.resolve();
}
