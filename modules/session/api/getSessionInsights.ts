import axios from "@/lib/axios";
import type { SessionInsights } from "../models/SessionInsights";

interface BackendInsightsResponse {
  statusCode: number;
  message: string;
  error: string;
  data: {
    therapist_time: string;
    client_time: string;
    utterance_count: number;
    theme: string;
    theme_explanation: string | null;
    sentiment_score: number;
  };
}

export async function getSessionInsights(
  sessionId: string
): Promise<SessionInsights> {
  const { data } = await axios.get<BackendInsightsResponse>(
    `/Session/session-insights/${sessionId}`
  );

  const backendData = data.data;

  // Parse percentages from strings like "44.25%"
  const therapistPercentage = parseFloat(
    backendData.therapist_time.replace("%", "")
  );
  const clientPercentage = parseFloat(backendData.client_time.replace("%", ""));

  // Calculate sentiment label based on score
  const getSentimentLabel = (score: number): string => {
    if (score >= 0.6) return "Positive";
    if (score >= 0.4) return "Neutral";
    if (score >= 0.2) return "Slightly Negative";
    return "Negative";
  };

  // Mock emotion distribution (not provided by API yet)
  const mockEmotionDistribution = [
    { emotion: "Anxious", percentage: 45, fill: "#60a5fa" },
    { emotion: "Sad", percentage: 25, fill: "#93c5fd" },
    { emotion: "Neutral", percentage: 20, fill: "#bfdbfe" },
    { emotion: "Hopeful", percentage: 10, fill: "#dbeafe" },
  ];

  return {
    emotionDistribution: mockEmotionDistribution,
    speakingTime: [
      {
        speaker: "Client",
        percentage: clientPercentage,
        fill: "#2463eb",
      },
      {
        speaker: "Therapist",
        percentage: therapistPercentage,
        fill: "#a5b4fc",
      },
    ],
    utteranceCount: [
      {
        speaker: "Client",
        count: backendData.utterance_count,
        fill: "#2463eb",
      },
      {
        speaker: "Therapist",
        count: backendData.utterance_count,
        fill: "#a5b4fc",
      },
    ],
    sentimentScore: backendData.sentiment_score,
    sentimentLabel: getSentimentLabel(backendData.sentiment_score),
    themes: [], // Deprecated - keeping for backwards compatibility
    theme: backendData.theme,
    theme_explanation: backendData.theme_explanation,
  };
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
