import type { ClientInsightsData } from "../models/ClientInsights";

export const mockClientInsightsData: ClientInsightsData = {
  sentimentTrend: [
    { month: "Aug", score: -1.2 },
    { month: "Sep", score: -0.5 },
    { month: "Sep", score: -0.8 },
    { month: "Oct", score: 0.8 },
    { month: "Oct", score: -0.2 },
    { month: "Nov", score: 0.3 },
  ],
  emotionDistribution: [
    { emotion: "Anxiety", percentage: 40, fill: "var(--chart-1)" },
    { emotion: "Sadness", percentage: 30, fill: "var(--chart-2)" },
    { emotion: "Hopelessness", percentage: 15, fill: "var(--chart-3)" },
    { emotion: "Other", percentage: 15, fill: "var(--chart-4)" },
  ],
  therapeuticThemes: [
    {
      id: "1",
      title: "Initial Assessment & Rapport Building",
      sessionRange: "Sessions 1-3",
      description:
        "Focus on understanding client's history and building trust.",
    },
    {
      id: "2",
      title: "Cognitive Restructuring",
      sessionRange: "Sessions 4-8",
      description:
        "Introduction and practice of CBT techniques to challenge negative thought patterns.",
    },
    {
      id: "3",
      title: "Behavioral Activation",
      sessionRange: "Sessions 9-12",
      description:
        "Encouraging engagement in positive activities and monitoring mood changes.",
    },
  ],
  keywords: [
    { word: "Anxious", frequency: 45, size: "lg" },
    { word: "Work Stress", frequency: 38, size: "lg" },
    { word: "Family", frequency: 32, size: "lg" },
    { word: "Sleep", frequency: 22, size: "md" },
    { word: "Overwhelmed", frequency: 20, size: "md" },
    { word: "Coping", frequency: 18, size: "md" },
  ],
  riskFlag: {
    detected: true,
    message: "Risk Flag Summary",
    recommendation:
      "Mentions of self-harm detected in the last session. Receive recommended.",
  },
};

// Function for future API integration
export function generateMockInsights(clientId: string): ClientInsightsData {
  // For now, return the same mock data
  // In the future, this could vary based on clientId
  return mockClientInsightsData;
}
