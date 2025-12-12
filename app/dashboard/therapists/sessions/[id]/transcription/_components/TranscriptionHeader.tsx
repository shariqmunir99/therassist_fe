"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { formatDuration } from "@/modules/shared/utils/formatter";

interface TranscriptionHeaderProps {
  sessionId: string;
  sessionDate: string;
  clientName: string;
  duration: number;
}

export function TranscriptionHeader({
  sessionId,
  sessionDate,
  clientName,
  duration,
}: TranscriptionHeaderProps) {
  const router = useRouter();

  const handleDownload = () => {
    // TODO: Implement transcript download functionality
    console.log("Download transcript for session:", sessionId);
  };

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
      <div className="flex flex-col gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.back()}
          className="w-fit -ml-2"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        <h1 className="text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em] text-[#111318] dark:text-gray-200">
          Session Transcription
        </h1>

        <div className="flex flex-wrap items-center gap-3 text-sm text-[#616e89] dark:text-gray-400">
          <span className="font-medium">{clientName}</span>
          <span>•</span>
          <span>{format(new Date(sessionDate), "MMM dd, yyyy")}</span>
          <span>•</span>
          <span>{formatDuration(duration)}</span>
        </div>
      </div>

      <div className="flex gap-2">
        <Button variant="outline" onClick={handleDownload}>
          <Download className="h-4 w-4 mr-2" />
          Download Transcript
        </Button>
      </div>
    </div>
  );
}
