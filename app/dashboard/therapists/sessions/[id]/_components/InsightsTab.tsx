"use client";

import { PieChartCard, BarChartCard } from "@/modules/shared/components/charts";
import { SentimentScoreCard } from "./SentimentScoreCard";
import { SessionThemesCard } from "./SessionThemesCard";
import { TherapistNotesCard } from "./TherapistNotesCard";
import type { SessionInsights } from "@/modules/session/models/SessionInsights";

interface InsightsTabProps {
  insights: SessionInsights;
  therapistNotes?: string;
  onSaveNotes?: (notes: string) => void;
}

export function InsightsTab({
  insights,
  therapistNotes = "",
  onSaveNotes,
}: InsightsTabProps) {
  // Transform data for charts
  const emotionData = insights.emotionDistribution.map((item) => ({
    name: item.emotion,
    value: item.percentage,
    fill: item.fill,
  }));

  const speakingTimeData = insights.speakingTime.map((item) => ({
    name: `${item.speaker} (${item.percentage}%)`,
    value: item.percentage,
    fill: item.fill,
  }));

  const utteranceData = insights.utteranceCount.map((item) => ({
    name: item.speaker,
    value: item.count,
    fill: item.fill,
  }));

  return (
    <div className="py-8">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left column - Charts */}
        <div className="flex flex-col gap-6 lg:col-span-2">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <PieChartCard
              title="Emotion Distribution"
              description="Breakdown of detected emotions."
              data={emotionData}
              showLegend={true}
            />
            <PieChartCard
              title="Speaking Time"
              description="Proportion of the session."
              data={speakingTimeData}
              innerRadius={60}
              showCenterLabel={false}
              showLegend={true}
            />
            <BarChartCard
              title="Utterance Count"
              description="Patient vs. Therapist."
              data={utteranceData}
              layout="horizontal"
            />
            <SentimentScoreCard
              score={insights.sentimentScore}
              label={insights.sentimentLabel}
            />
          </div>
          <SessionThemesCard themes={insights.themes} />
        </div>

        {/* Right column - Therapist Notes */}
        <div className="flex flex-col gap-6 lg:col-span-1">
          <TherapistNotesCard notes={therapistNotes} onSave={onSaveNotes} />
        </div>
      </div>
    </div>
  );
}
