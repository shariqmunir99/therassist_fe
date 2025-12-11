export interface SentimentDataPoint {
  month: string;
  score: number;
}

export interface EmotionDistribution {
  emotion: string;
  percentage: number;
  fill: string;
}

export interface TherapeuticTheme {
  id: string;
  title: string;
  sessionRange: string;
  description: string;
}

export interface KeywordData {
  word: string;
  frequency: number;
  size: "sm" | "md" | "lg";
}

export interface RiskFlag {
  detected: boolean;
  message?: string;
  recommendation?: string;
}

export interface ClientInsightsData {
  sentimentTrend: SentimentDataPoint[];
  emotionDistribution: EmotionDistribution[];
  therapeuticThemes: TherapeuticTheme[];
  keywords: KeywordData[];
  riskFlag: RiskFlag;
}
