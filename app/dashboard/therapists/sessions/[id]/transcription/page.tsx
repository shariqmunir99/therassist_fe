"use client";

import { useState, useMemo, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useSession, useUtterances } from "@/modules/session/hooks/useSession";
import { TranscriptionHeader } from "./_components/TranscriptionHeader";
import { SessionInfoCard } from "../_components/SessionInfoCard";
import { TranscriptionFilters } from "./_components/TranscriptionFilters";
import { ConversationView } from "./_components/ConversationView";
import { TranscriptionSkeleton } from "./_components/TranscriptionSkeleton";
import { utteranceToSegment } from "@/modules/session/models/Utterance";
import { TranscriptionSegment } from "@/modules/session/api/getTranscription";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useClient } from "@/modules/client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function TranscriptionPage() {
  const params = useParams();
  const router = useRouter();
  const sessionId = params.id as string;

  // State
  const [selectedSpeaker, setSelectedSpeaker] = useState<
    "all" | "client" | "therapist"
  >("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [allUtterances, setAllUtterances] = useState<TranscriptionSegment[]>(
    []
  );
  const pageSize = 20;

  // Fetch session data
  const { data: session, isLoading: isLoadingSession } = useSession(sessionId);

  // Fetch client data
  const { data: client, isLoading: isLoadingClient } = useClient(
    session?.clientId || ""
  );

  // Fetch utterances with pagination
  const {
    data: utterancesResponse,
    isLoading: isLoadingUtterances,
    error: utterancesError,
  } = useUtterances(sessionId, currentPage, pageSize);

  // Accumulate utterances when new page loads
  useEffect(() => {
    if (utterancesResponse?.data) {
      const newSegments = utterancesResponse.data.map(utteranceToSegment);
      if (currentPage === 1) {
        // Reset for first page
        setAllUtterances(newSegments);
      } else {
        // Append for subsequent pages
        setAllUtterances((prev) => [...prev, ...newSegments]);
      }
    }
  }, [utterancesResponse, currentPage]);

  // Filter segments based on selected speaker
  const filteredSegments = useMemo(() => {
    if (!allUtterances || allUtterances.length === 0) return [];

    if (selectedSpeaker === "all") {
      return allUtterances;
    }

    return allUtterances.filter(
      (segment) => segment.speaker === selectedSpeaker
    );
  }, [allUtterances, selectedSpeaker]);

  // Handle load more
  const handleLoadMore = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const hasMore = utterancesResponse?.hasMore ?? false;
  const isLoadingMore = isLoadingUtterances && currentPage > 1;

  // Loading state
  if (isLoadingSession || (isLoadingUtterances && currentPage === 1)) {
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

  // Get client display name from session alias
  const clientDisplayName = session.alias || "Client";

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
    console.log("Start querying for transcription - Coming soon");
  };

  return (
    <div className="flex w-full flex-col gap-8">
      {/* Breadcrumb */}
      {isLoadingSession || isLoadingClient ? (
        <div className="h-5 w-80 bg-gray-200 animate-pulse rounded" />
      ) : (
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/dashboard/therapists/clients">Clients</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link
                  href={`/dashboard/therapists/clients/${session?.clientId}`}
                >
                  {client?.alias}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={`/dashboard/therapists/sessions/${sessionId}`}>
                  SES-{session?.session_number}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Transcription</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      )}

      {/* Header with Start Querying Button */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-black leading-tight tracking-[-0.033em] text-[#111318] dark:text-gray-200">
            Session Transcription
          </h1>
          <p className="text-base font-normal leading-normal text-[#616e89] dark:text-gray-400">
            Review and analyze the full conversation transcript.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  disabled
                  className="flex items-center gap-2 bg-[#2463eb] hover:bg-[#1d4fd7] cursor-not-allowed opacity-50"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
                    />
                  </svg>
                  Start Querying
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Available soon</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      {/* Session Info Card */}
      <SessionInfoCard
        alias={clientDisplayName}
        sessionDate={sessionDate}
        sessionId={`SES-${session.session_number}`}
        status={session.status}
        duration={session.duration}
      />

      {/* Filters */}
      <TranscriptionFilters
        selectedSpeaker={selectedSpeaker}
        onSpeakerChange={setSelectedSpeaker}
      />

      {/* Conversation View */}
      {allUtterances.length > 0 && (
        <>
          <ConversationView
            segments={filteredSegments}
            clientName={clientDisplayName}
            therapistName="You"
          />

          {/* Load More Button */}
          {hasMore && (
            <div className="flex justify-center py-8">
              <Button
                onClick={handleLoadMore}
                disabled={isLoadingMore}
                variant="outline"
                size="lg"
              >
                {isLoadingMore ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Loading...
                  </>
                ) : (
                  "Load More"
                )}
              </Button>
            </div>
          )}
        </>
      )}

      {/* Empty state when no transcription */}
      {!isLoadingUtterances && allUtterances.length === 0 && (
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
