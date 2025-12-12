"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SessionInfoCardProps {
  alias: string;
  sessionDate: string;
  sessionId: string;
  status: string;
  duration: string | number;
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

export function SessionInfoCard({
  alias,
  sessionDate,
  sessionId,
  status,
  duration,
}: SessionInfoCardProps) {
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
      case "PROCESSED":
        return "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700/50 dark:text-gray-200";
    }
  };

  const durationInMinutes = parseDuration(duration);

  return (
    <TooltipProvider>
      <div className="flex flex-wrap items-center justify-between gap-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-1.5">
          <p className="text-xs font-medium text-[#616e89]">SESSION ID</p>
          <p className="text-base font-semibold text-[#111318]">#{sessionId}</p>
        </div>
        <div className="hidden h-10 w-px bg-gray-200 md:block"></div>
        <div className="flex flex-col gap-1.5">
          <p className="text-xs font-medium text-[#616e89]">PATIENT</p>
          <p className="text-base font-semibold text-[#111318]">{alias}</p>
        </div>
        <div className="hidden h-10 w-px bg-gray-200 md:block"></div>
        <div className="flex flex-col gap-1.5">
          <p className="text-xs font-medium text-[#616e89]">SESSION DATE</p>
          <p className="text-base font-semibold text-[#111318]">
            {sessionDate}
          </p>
        </div>
        <div className="hidden h-10 w-px bg-gray-200 md:block"></div>
        <div className="flex flex-col gap-1.5">
          <p className="text-xs font-medium text-[#616e89]">DURATION</p>
          {durationInMinutes !== null ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <p className="text-base font-semibold text-[#111318] cursor-help">
                  {durationInMinutes} min
                </p>
              </TooltipTrigger>
              <TooltipContent>
                <p>{duration}</p>
              </TooltipContent>
            </Tooltip>
          ) : (
            <p className="text-base font-semibold text-[#111318]">N/A</p>
          )}
        </div>
        <div className="hidden h-10 w-px bg-gray-200 md:block"></div>
        <div className="flex flex-col gap-1.5 items-center justify-center">
          <p className="text-xs font-medium text-[#616e89]">STATUS</p>
          <div
            className={`flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-full px-3 ${getStatusColor(
              status
            )}`}
          >
            <p className="text-sm font-medium leading-normal">{status}</p>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
