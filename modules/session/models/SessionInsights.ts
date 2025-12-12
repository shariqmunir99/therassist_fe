export interface EmotionDistribution {
  emotion: string;
  percentage: number;
  fill: string;
}

export interface SpeakingTime {
  speaker: string;
  percentage: number;
  fill: string;
}

export interface UtteranceCount {
  speaker: string;
  count: number;
  fill: string;
}

export interface SessionInsights {
  emotionDistribution: EmotionDistribution[];
  speakingTime: SpeakingTime[];
  utteranceCount: UtteranceCount[];
  sentimentScore: number;
  sentimentLabel: string;
  themes: string[];
}
