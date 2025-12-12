"use client";

import { useParams } from "next/navigation";
import { SessionHeader } from "./_components/SessionHeader";
import { SessionInfoCard } from "./_components/SessionInfoCard";
import { SessionInfoCardSkeleton } from "./_components/SessionInfoCardSkeleton";
import { InsightsTab } from "./_components/InsightsTab";
import { InsightsTabSkeleton } from "./_components/InsightsTabSkeleton";
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

  // Fetch session insights (now using real API)
  const { data: insights, isLoading: isLoadingInsights } = useSessionInsights(
    sessionId,
    false // Using real API now
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

  // Show error state if session fails to load
  if (!isLoadingSession && !session) {
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
  const sessionDate = session
    ? new Date(session.sessionDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  return (
    <div className="flex w-full flex-col gap-8">
      <SessionHeader
        sessionId={sessionId}
        onStartQuerying={handleStartQuerying}
      />

      {/* Session Info Card - Show skeleton while loading */}
      {isLoadingSession ? (
        <SessionInfoCardSkeleton />
      ) : (
        session && (
          <SessionInfoCard
            alias={session.alias || session.clientId}
            sessionDate={sessionDate}
            sessionId={`SES-${session.session_number}`}
            status={session.processing_state}
            duration={session.duration}
          />
        )
      )}

      {/* Insights Tab - Show skeleton while loading */}
      {isLoadingInsights ? (
        <InsightsTabSkeleton />
      ) : (
        insights &&
        session && (
          <InsightsTab
            insights={insights}
            session={session}
            therapistNotes={session.notes || ""}
            onSaveNotes={handleSaveNotes}
          />
        )
      )}
    </div>
  );
}
