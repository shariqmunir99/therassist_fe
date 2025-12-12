"use client";

import { useState, useRef, useEffect } from "react";
import { Play, Pause } from "lucide-react";
import { formatTimestamp } from "../utils/audioUtils";
import { cn } from "@/lib/utils";

interface UtteranceAudioPlayerProps {
  audioUrl: string;
  speaker: "client" | "therapist";
  className?: string;
}

export function UtteranceAudioPlayer({
  audioUrl,
  speaker,
  className,
}: UtteranceAudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  const buttonBgClass =
    speaker === "client"
      ? "bg-gray-100 dark:bg-gray-700 hover:bg-primary/10"
      : "bg-white dark:bg-gray-700 hover:bg-white/80";

  const progressBgClass =
    speaker === "client"
      ? "bg-gray-200 dark:bg-gray-600"
      : "bg-gray-300 dark:bg-gray-500";

  return (
    <div className={cn("flex items-center gap-3 pt-2", className)}>
      <audio ref={audioRef} src={audioUrl} preload="metadata" />

      <button
        onClick={togglePlayPause}
        className={cn(
          "flex shrink-0 size-8 items-center justify-center rounded-full text-[#111318] dark:text-gray-300 transition-colors",
          buttonBgClass
        )}
        aria-label={isPlaying ? "Pause" : "Play"}
      >
        {isPlaying ? (
          <Pause className="h-4 w-4" />
        ) : (
          <Play className="h-4 w-4" />
        )}
      </button>

      <div className="flex items-center gap-1 w-full h-6">
        <div
          className={cn(
            "w-full rounded-full h-1 relative overflow-hidden",
            progressBgClass
          )}
        >
          <div
            className="bg-primary h-1 absolute left-0 top-0 transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="w-1 h-1 rounded-full bg-primary" />
      </div>

      {duration > 0 && (
        <span className="text-xs text-[#616e89] dark:text-gray-400 min-w-[2.5rem]">
          {formatTimestamp(currentTime)}
        </span>
      )}
    </div>
  );
}
