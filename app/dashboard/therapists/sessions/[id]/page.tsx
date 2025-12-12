"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { SessionInfoCard } from "./_components/SessionInfoCard";
import { SessionInfoCardSkeleton } from "./_components/SessionInfoCardSkeleton";
import { InsightsTab } from "./_components/InsightsTab";
import { InsightsTabSkeleton } from "./_components/InsightsTabSkeleton";
import {
  useSession,
  useSessionInsights,
  useUpdateSessionNotes,
} from "@/modules/session/hooks/useSession";
import { useClient } from "@/modules/client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

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
      {/* Breadcrumb */}
      {isLoadingSession ? (
        <div className="h-5 w-64 bg-gray-200 animate-pulse rounded" />
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
              <BreadcrumbPage>SES-{session?.session_number}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      )}

      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-black leading-tight tracking-[-0.033em] text-[#111318] dark:text-gray-200">
            Session Details
          </h1>
          <p className="text-base font-normal leading-normal text-[#616e89] dark:text-gray-400">
            Review session summary and insights.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() =>
              (window.location.href = `/dashboard/therapists/sessions/${sessionId}/transcription`)
            }
            className="flex items-center gap-2"
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
                d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
              />
            </svg>
            View Transcript
          </Button>
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
