"use client";

import { TranscriptionSegment } from "../api/getTranscription";
import { EmotionBadge } from "./EmotionBadge";
import { UtteranceAudioPlayer } from "./UtteranceAudioPlayer";
import { formatTimestamp } from "../utils/audioUtils";
import {
  extractThemeNames,
  getThemeColor,
  getThemeTextColor,
} from "../utils/themeColors";
import { Badge } from "@/components/ui/badge";
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

  const themeNames = extractThemeNames(segment.clinicalThemes);
  const hasThemes = themeNames.length > 0;

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

            {/* Clinical Themes */}
            {hasThemes ? (
              <div className="flex flex-wrap gap-2 mt-1">
                {themeNames.map((theme) => {
                  const bgColor = getThemeColor(theme);
                  const textColor = getThemeTextColor();
                  return (
                    <Badge
                      key={theme}
                      variant="secondary"
                      className="text-xs font-medium"
                      style={{
                        backgroundColor: bgColor,
                        color: textColor,
                        borderColor: bgColor,
                      }}
                    >
                      {theme}
                    </Badge>
                  );
                })}
              </div>
            ) : (
              <p className="text-xs text-gray-400 dark:text-gray-500 italic mt-1">
                No themes identified
              </p>
            )}

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
