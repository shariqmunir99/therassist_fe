"use client";

import { getClientInsights } from "../../api/getClientInsights";
import { SentimentTrendChart } from "./SentimentTrendChart";
import { EmotionDistributionChart } from "./EmotionDistributionChart";
import { TherapeuticThemesTimeline } from "./TherapeuticThemesTimeline";
import { KeywordFrequencyCloud } from "./KeywordFrequencyCloud";
import { RiskFlagSummary } from "./RiskFlagSummary";

interface ClientInsightsProps {
  clientId: string;
}

export function ClientInsights({ clientId }: ClientInsightsProps) {
  // Currently using mock data, will be replaced with React Query hook
  // when backend API is ready
  const insightsData = getClientInsights(clientId);

  return (
    <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
      {/* Left column - Large charts (2/3 width on large screens) */}
      <div className="space-y-6 lg:col-span-2">
        <SentimentTrendChart data={insightsData.sentimentTrend} />
        <TherapeuticThemesTimeline themes={insightsData.therapeuticThemes} />
      </div>

      {/* Right column - Widgets (1/3 width on large screens) */}
      <div className="space-y-6">
        <EmotionDistributionChart data={insightsData.emotionDistribution} />
        <KeywordFrequencyCloud keywords={insightsData.keywords} />
        <RiskFlagSummary riskFlag={insightsData.riskFlag} />
      </div>
    </div>
  );
}
