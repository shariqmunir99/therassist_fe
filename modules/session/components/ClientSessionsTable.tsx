"use client";

import { useRouter } from "next/navigation";
import { RefreshCw, FileUp } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useClientSessions } from "../hooks/useSession";

interface ClientSessionsTableProps {
  clientId: string;
  therapistId: string;
}

// Utility function to parse HH:MM:SS or H:MM:SS duration to minutes
function parseDuration(duration: string | number): number | null {
  if (typeof duration === "number") return duration;

  // Match both "00:10:09" and "0:10:09" formats
  const match = duration.match(/^(\d{1,2}):(\d{2}):(\d{2})$/);
  if (!match) return null;

  const hours = parseInt(match[1], 10);
  const minutes = parseInt(match[2], 10);
  const seconds = parseInt(match[3], 10);

  return Math.round(hours * 60 + minutes + seconds / 60);
}

export function ClientSessionsTable({
  clientId,
  therapistId,
}: ClientSessionsTableProps) {
  const router = useRouter();
  const {
    data: sessions,
    isLoading,
    error,
    refetch,
  } = useClientSessions(clientId, therapistId);

  // Show error toast when error occurs
  if (error && !isLoading) {
    toast.error("Failed to load sessions");
  }

  const getStatusColor = (status: string) => {
    const upperStatus = status?.toUpperCase();
    switch (upperStatus) {
      case "UPLOADED":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200";
      case "TRANSCRIBED":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-200";
      case "ANNOTATED":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-200";
      case "COMPLETED":
        return "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700/50 dark:text-gray-200";
    }
  };

  const getStatusLabel = (status: string) => {
    const upperStatus = status?.toUpperCase();
    switch (upperStatus) {
      case "UPLOADED":
        return "Uploaded";
      case "TRANSCRIBED":
        return "Transcribed";
      case "ANNOTATED":
        return "Annotated";
      case "COMPLETED":
        return "Completed";
      default:
        return status;
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="mt-6">
        <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800/30">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800/50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400"
                >
                  Session
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400"
                >
                  Date
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400"
                >
                  Duration
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400"
                >
                  Status
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {[1, 2, 3].map((i) => (
                <tr key={i}>
                  <td className="whitespace-nowrap px-6 py-4">
                    <Skeleton className="h-5 w-20" />
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <Skeleton className="h-5 w-24" />
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <Skeleton className="h-5 w-16" />
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <Skeleton className="h-6 w-20" />
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-right">
                    <Skeleton className="ml-auto h-9 w-24" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="mt-6">
        <div className="rounded-lg border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/10 p-8 text-center">
          <p className="mb-4 text-sm text-red-800 dark:text-red-200">
            Failed to load sessions
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => refetch()}
            className="gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Retry
          </Button>
        </div>
      </div>
    );
  }

  // Empty state
  if (!sessions || sessions.length === 0) {
    return (
      <div className="mt-6">
        <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800/30 p-12 text-center">
          <FileUp className="mx-auto mb-4 h-12 w-12 text-gray-400" />
          <h3 className="mb-2 text-lg font-semibold text-[#111218] dark:text-white">
            No sessions yet
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Upload your first session to get started with insights and analysis
          </p>
        </div>
      </div>
    );
  }

  // Success state with data
  return (
    <TooltipProvider>
      <div className="mt-6">
        <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800/30">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800/50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400"
                >
                  Session
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400"
                >
                  Date
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400"
                >
                  Duration
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400"
                >
                  Status
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {sessions.map((session) => {
                const durationInMinutes = parseDuration(session.duration);
                return (
                  <tr key={session.id}>
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-[#111218] dark:text-white">
                      SES-{session.session_number}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                      {new Date(session.sessionDate).toLocaleDateString(
                        "en-US",
                        {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        }
                      )}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                      {durationInMinutes !== null ? (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span className="cursor-help">
                              {durationInMinutes} min
                            </span>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{session.duration}</p>
                          </TooltipContent>
                        </Tooltip>
                      ) : (
                        "N/A"
                      )}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(
                          session.status
                        )}`}
                      >
                        {getStatusLabel(session.status)}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          router.push(
                            `/dashboard/therapists/sessions/${session.id}`
                          )
                        }
                      >
                        View Details
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </TooltipProvider>
  );
}
