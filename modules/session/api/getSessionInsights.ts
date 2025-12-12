import axios from "@/lib/axios";
import type { SessionInsights } from "../models/SessionInsights";

export async function getSessionInsights(
  sessionId: string
): Promise<SessionInsights> {
  const { data } = await axios.get<SessionInsights>(
    `/api/sessions/${sessionId}/insights`
  );
  return data;
}

// Mock data for development
export function getMockSessionInsights(
  sessionId: string
): Promise<SessionInsights> {
  return Promise.resolve({
    emotionDistribution: [
      { emotion: "Anxious", percentage: 45, fill: "#60a5fa" },
      { emotion: "Sad", percentage: 25, fill: "#93c5fd" },
      { emotion: "Neutral", percentage: 20, fill: "#bfdbfe" },
      { emotion: "Hopeful", percentage: 10, fill: "#dbeafe" },
    ],
    speakingTime: [
      { speaker: "Patient", percentage: 58, fill: "#2463eb" },
      { speaker: "Therapist", percentage: 42, fill: "#a5b4fc" },
    ],
    utteranceCount: [
      { speaker: "Patient", count: 84, fill: "#2463eb" },
      { speaker: "Therapist", count: 62, fill: "#a5b4fc" },
    ],
    sentimentScore: 0.3,
    sentimentLabel: "Slightly Negative",
    themes: [
      "Work-related Anxiety",
      "Imposter Syndrome",
      "Cognitive Restructuring",
    ],
  });
}
