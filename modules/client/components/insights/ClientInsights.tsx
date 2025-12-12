"use client";

import { RefreshCw, TrendingUp } from "lucide-react";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useClientInsights } from "../../hooks/useClientInsights";
import { SentimentTrendChart } from "./SentimentTrendChart";
import { EmotionDistributionChart } from "./EmotionDistributionChart";
import { TherapeuticThemesTimeline } from "./TherapeuticThemesTimeline";
import { KeywordFrequencyCloud } from "./KeywordFrequencyCloud";
import { RiskFlagSummary } from "./RiskFlagSummary";

interface ClientInsightsProps {
  clientId: string;
}

export function ClientInsights({ clientId }: ClientInsightsProps) {
  const {
    data: insightsData,
    isLoading,
    error,
    refetch,
  } = useClientInsights(clientId);

  // Show error toast when error occurs
  if (error && !isLoading) {
    toast.error("Failed to load client insights");
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left column */}
        <div className="space-y-6 lg:col-span-2">
          <Skeleton className="h-80 w-full rounded-xl" />
          <Skeleton className="h-64 w-full rounded-xl" />
        </div>
        {/* Right column */}
        <div className="space-y-6">
          <Skeleton className="h-64 w-full rounded-xl" />
          <Skeleton className="h-48 w-full rounded-xl" />
          <Skeleton className="h-32 w-full rounded-xl" />
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="mt-6">
        <div className="rounded-lg border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/10 p-8 text-center">
          <p className="mb-4 text-sm text-red-800 dark:text-red-200">
            Failed to load insights
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => refetch()}
            className="gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Retry
          </Button>
        </div>
      </div>
    );
  }

  // Empty state (no insights yet)
  if (!insightsData) {
    return (
      <div className="mt-6">
        <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800/30 p-12 text-center">
          <TrendingUp className="mx-auto mb-4 h-12 w-12 text-gray-400" />
          <h3 className="mb-2 text-lg font-semibold text-[#111218] dark:text-white">
            Insights available after first session
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Upload and process a session to view client insights and analytics
          </p>
        </div>
      </div>
    );
  }

  // Success state with data
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
