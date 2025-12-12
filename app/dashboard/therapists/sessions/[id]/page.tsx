"use client";

import { useParams } from "next/navigation";
import { SessionHeader } from "./_components/SessionHeader";
import { SessionInfoCard } from "./_components/SessionInfoCard";
import { InsightsTab } from "./_components/InsightsTab";
import {
  useSession,
  useSessionInsights,
  useUpdateSessionNotes,
} from "@/modules/session/hooks/useSession";

export default function SessionDetailPage() {
  const params = useParams();
  const sessionId = params.id as string;

  // Fetch session data
  const { data: session, isLoading: isLoadingSession } = useSession(sessionId);

  // Fetch session insights (using mock data for now)
  const { data: insights, isLoading: isLoadingInsights } = useSessionInsights(
    sessionId,
    true // Set to false when backend is ready
  );

  // Mutation for updating notes
  const updateNotesMutation = useUpdateSessionNotes();

  const handleStartQuerying = () => {
    console.log("Start querying clicked");
    // TODO: Implement querying functionality
  };

  const handleSaveNotes = (notes: string) => {
    updateNotesMutation.mutate({ sessionId, notes });
  };

  if (isLoadingSession || isLoadingInsights) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-[#2463eb]"></div>
          <p className="mt-4 text-sm text-gray-500">Loading session...</p>
        </div>
      </div>
    );
  }

  if (!session || !insights) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <p className="text-lg font-semibold text-gray-900">
            Session not found
          </p>
          <p className="mt-2 text-sm text-gray-500">
            The session you're looking for doesn't exist or you don't have
            access to it.
          </p>
        </div>
      </div>
    );
  }

  // Format session date
  const sessionDate = new Date(session.sessionDate).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  return (
    <div className="flex w-full flex-col gap-8">
      <SessionHeader
        sessionId={sessionId}
        onStartQuerying={handleStartQuerying}
      />

      <SessionInfoCard
        patientName={session.clientId} // TODO: Fetch client name
        sessionDate={sessionDate}
        sessionId={session.id}
        status={session.status}
      />

      <InsightsTab
        insights={insights}
        therapistNotes={session.notes || ""}
        onSaveNotes={handleSaveNotes}
      />
    </div>
  );
}
