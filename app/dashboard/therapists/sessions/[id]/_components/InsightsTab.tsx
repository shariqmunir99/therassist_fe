"use client";

import { PieChartCard, BarChartCard } from "@/modules/shared/components/charts";
import { SentimentScoreCard } from "./SentimentScoreCard";
import { SessionThemesCard } from "./SessionThemesCard";
import { TherapistNotesCard } from "./TherapistNotesCard";
import type { SessionInsights } from "@/modules/session/models/SessionInsights";
import type { Session } from "@/modules/session/models/Session";

interface InsightsTabProps {
  insights: SessionInsights;
  session: Session;
  therapistNotes?: string;
  onSaveNotes?: (notes: string) => void;
}

export function InsightsTab({
  insights,
  session,
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
    name: `${item.speaker} (${item.percentage.toFixed(1)}%)`,
    value: item.percentage,
    fill: item.fill,
  }));

  const utteranceData = [
    {
      name: "Client",
      value: session.client_count || 0,
      fill: "#2463eb",
    },
    {
      name: "Therapist",
      value: session.therapist_count || 0,
      fill: "#a5b4fc",
    },
  ];

  return (
    <div className="py-8">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left column - Charts */}
        <div className="flex flex-col gap-6 lg:col-span-2">
          {/* Session Theme at the top */}
          <SessionThemesCard
            theme={insights.theme || "No theme available"}
            themeExplanation={insights.theme_explanation}
          />
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
        </div>

        {/* Right column - Therapist Notes */}
        <div className="flex flex-col gap-6 lg:col-span-1">
          <TherapistNotesCard notes={therapistNotes} onSave={onSaveNotes} />
        </div>
      </div>
    </div>
  );
}
