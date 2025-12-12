"use client";

import { TranscriptionSegment } from "../api/getTranscription";
import { EmotionBadge } from "./EmotionBadge";
import { UtteranceAudioPlayer } from "./UtteranceAudioPlayer";
import { formatTimestamp } from "../utils/audioUtils";
import { cn } from "@/lib/utils";

interface TranscriptSegmentProps {
  segment: TranscriptionSegment;
  speakerName: string;
  className?: string;
}

export function TranscriptSegment({
  segment,
  speakerName,
  className,
}: TranscriptSegmentProps) {
  const isClient = segment.speaker === "client";
  const isTherapist = segment.speaker === "therapist";

  const bubbleClasses = isClient
    ? "rounded-xl rounded-tl-none bg-white dark:bg-[#1A202C] p-4 shadow-sm w-full"
    : "rounded-xl rounded-tr-none bg-primary/10 dark:bg-primary/20 p-4 shadow-sm w-full";

  const containerClasses = cn(
    "flex w-full max-w-xl",
    isClient && "justify-start",
    isTherapist && "justify-end self-end"
  );

  const innerContainerClasses = cn(
    "flex flex-col gap-2 w-full",
    isTherapist && "items-end"
  );

  return (
    <div className={cn(containerClasses, className)}>
      <div className={innerContainerClasses}>
        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
          {speakerName}
        </p>

        <div className={bubbleClasses}>
          <div className="flex flex-1 flex-col justify-center gap-3">
            {/* Timestamp and Emotion Row */}
            <div className="flex items-center justify-between">
              <p className="text-[#616e89] dark:text-gray-400 text-sm font-normal leading-normal">
                {formatTimestamp(segment.startTime)}
              </p>
              {segment.emotion && <EmotionBadge emotion={segment.emotion} />}
            </div>

            {/* Transcript Text */}
            <p className="text-[#111318] dark:text-gray-200 text-base font-normal leading-relaxed">
              {segment.text}
            </p>

            {/* Audio Player */}
            <UtteranceAudioPlayer
              audioUrl={segment.audioUrl}
              speaker={segment.speaker}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
