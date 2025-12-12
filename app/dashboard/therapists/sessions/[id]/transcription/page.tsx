"use client";

import { useState, useMemo, useEffect } from "react";
import { useParams } from "next/navigation";
import {
  useSession,
  useTranscription,
} from "@/modules/session/hooks/useSession";
import { useClient } from "@/modules/client/hooks/useClient";
import { getCurrentUserName } from "@/lib/auth/getUserFromToken";
import { SessionHeader } from "../_components/SessionHeader";
import { SessionInfoCard } from "../_components/SessionInfoCard";
import { TranscriptionFilters } from "./_components/TranscriptionFilters";
import { ConversationView } from "./_components/ConversationView";
import { TranscriptionSkeleton } from "./_components/TranscriptionSkeleton";

export default function TranscriptionPage() {
  const params = useParams();
  const sessionId = params.id as string;

  // State
  const [selectedSpeaker, setSelectedSpeaker] = useState<
    "all" | "client" | "therapist"
  >("all");
  const [therapistName, setTherapistName] = useState("Dr. Smith");

  // Get therapist name on mount (client-side only)
  useEffect(() => {
    const name = getCurrentUserName();
    setTherapistName(name);
  }, []);

  // Fetch session data
  const { data: session, isLoading: isLoadingSession } = useSession(sessionId);

  // Fetch transcription
  const { data: transcription, isLoading: isLoadingTranscription } =
    useTranscription(sessionId);

  // Fetch client data for name
  const { data: client, isLoading: isLoadingClient } = useClient(
    session?.clientId || ""
  );

  // Filter segments based on selected speaker
  const filteredSegments = useMemo(() => {
    if (!transcription?.segments) return [];

    if (selectedSpeaker === "all") {
      return transcription.segments;
    }

    return transcription.segments.filter(
      (segment) => segment.speaker === selectedSpeaker
    );
  }, [transcription?.segments, selectedSpeaker]);

  // Loading state
  if (isLoadingSession || isLoadingTranscription || isLoadingClient) {
    return (
      <div className="flex w-full flex-col gap-8">
        <div className="flex flex-col gap-4">
          <div className="h-8 w-32 bg-gray-200 animate-pulse rounded" />
          <div className="h-10 w-96 bg-gray-200 animate-pulse rounded" />
          <div className="h-5 w-64 bg-gray-200 animate-pulse rounded" />
        </div>
        <TranscriptionSkeleton />
      </div>
    );
  }

  // Error state - session not found
  if (!session) {
    return (
      <div className="flex h-full items-center justify-center py-16">
        <div className="text-center">
          <p className="text-lg font-semibold text-gray-900 dark:text-gray-200">
            Session not found
          </p>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            The session you're looking for doesn't exist or you don't have
            access to it.
          </p>
        </div>
      </div>
    );
  }

  // Get client display name
  const clientDisplayName =
    client?.firstName && client?.lastName
      ? `${client.firstName} ${client.lastName}`
      : client?.alias || "Client";

  // Format session date
  const sessionDate = new Date(session.sessionDate).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  const handleStartQuerying = () => {
    console.log("Start querying for transcription");
    // TODO: Implement querying functionality for transcription
  };

  return (
    <div className="flex w-full flex-col gap-8">
      {/* Header - Using the professional header from session detail */}
      <SessionHeader
        sessionId={sessionId}
        onStartQuerying={handleStartQuerying}
      />

      {/* Session Info Card */}
      <SessionInfoCard
        patientName={clientDisplayName}
        sessionDate={sessionDate}
        sessionId={session.id}
        status={session.status}
      />

      {/* Filters */}
      <TranscriptionFilters
        selectedSpeaker={selectedSpeaker}
        onSpeakerChange={setSelectedSpeaker}
      />

      {/* Conversation View */}
      {transcription && (
        <ConversationView
          segments={filteredSegments}
          clientName={clientDisplayName}
          therapistName={therapistName}
        />
      )}

      {/* Empty state when no transcription */}
      {!transcription && (
        <div className="flex items-center justify-center py-16 text-center">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="mx-auto h-12 w-12 text-gray-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
              />
            </svg>
            <p className="mt-4 text-sm font-medium text-gray-900 dark:text-gray-200">
              No transcription available
            </p>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              The transcription for this session is not yet available.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
