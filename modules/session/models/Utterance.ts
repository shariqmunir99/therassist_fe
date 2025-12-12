import { TranscriptionSegment } from "../api/getTranscription";

/**
 * Backend utterance model from POST /api/Session/utterances
 */
export interface Utterance {
  id: string;
  session_id: string;
  speaker: "A" | "B";
  start_time: string; // Format: "HH:MM:SS"
  end_time: string; // Format: "HH:MM:SS"
  utterance: string;
  clinical_themes: Record<string, number>; // { "Theme Name": confidence_score }
}

/**
 * Parses a time string in format "HH:MM:SS" to seconds
 * @param timeString - Time in format "HH:MM:SS"
 * @returns Total seconds
 */
export function parseTimeString(timeString: string): number {
  const parts = timeString.split(":");
  if (parts.length !== 3) return 0;

  const hours = parseInt(parts[0], 10) || 0;
  const minutes = parseInt(parts[1], 10) || 0;
  const seconds = parseInt(parts[2], 10) || 0;

  return hours * 3600 + minutes * 60 + seconds;
}

/**
 * Maps speaker "A" to "therapist" and "B" to "client"
 * @param speaker - Backend speaker identifier
 * @returns Frontend speaker type
 */
export function mapSpeaker(speaker: "A" | "B"): "client" | "therapist" {
  return speaker === "A" ? "therapist" : "client";
}

/**
 * Transforms backend Utterance to frontend TranscriptionSegment
 * @param utterance - Backend utterance object
 * @returns TranscriptionSegment for frontend use
 */
export function utteranceToSegment(utterance: Utterance): TranscriptionSegment {
  return {
    id: utterance.id,
    startTime: parseTimeString(utterance.start_time),
    endTime: parseTimeString(utterance.end_time),
    text: utterance.utterance,
    speaker: mapSpeaker(utterance.speaker),
    audioUrl: "", // Backend doesn't provide audioUrl yet
    clinicalThemes: utterance.clinical_themes,
  };
}
