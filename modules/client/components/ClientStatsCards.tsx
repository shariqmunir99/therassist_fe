"use client";

import { RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useClientStats } from "../hooks/useClientStats";

interface ClientStatsCardsProps {
  clientId: string;
}

export function ClientStatsCards({ clientId }: ClientStatsCardsProps) {
  const { data: stats, isLoading, error, refetch } = useClientStats(clientId);

  // Show error toast when error occurs
  if (error && !isLoading) {
    toast.error("Failed to load client statistics");
  }

  // Loading state
  if (isLoading) {
    return (
      <section className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <Card
            key={i}
            className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800/30"
          >
            <CardContent className="p-4">
              <Skeleton className="mb-2 h-4 w-24" />
              <Skeleton className="h-9 w-16" />
            </CardContent>
          </Card>
        ))}
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="mb-8">
        <Card className="rounded-xl border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/10">
          <CardContent className="p-6 text-center">
            <p className="mb-4 text-sm text-red-800 dark:text-red-200">
              Failed to load statistics
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
          </CardContent>
        </Card>
      </section>
    );
  }

  // Empty state (no sessions)
  if (stats && stats.totalSessions === 0) {
    return (
      <section className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        <Card className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800/30">
          <CardContent className="p-4">
            <p className="mb-1 text-sm font-medium text-gray-500 dark:text-gray-400">
              Total Sessions
            </p>
            <p className="text-3xl font-bold text-[#111218] dark:text-white">
              0
            </p>
          </CardContent>
        </Card>
        <Card className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800/30">
          <CardContent className="p-4">
            <p className="mb-1 text-sm font-medium text-gray-500 dark:text-gray-400">
              Last Session
            </p>
            <p className="text-lg font-medium text-gray-400 dark:text-gray-500">
              No sessions yet
            </p>
          </CardContent>
        </Card>
        <Card className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800/30">
          <CardContent className="p-4">
            <p className="mb-1 text-sm font-medium text-gray-500 dark:text-gray-400">
              Processing Status
            </p>
            <p className="text-lg font-medium text-gray-400 dark:text-gray-500">
              No pending
            </p>
          </CardContent>
        </Card>
      </section>
    );
  }

  // Success state with data
  return (
    <section className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
      <Card className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800/30">
        <CardContent className="p-4">
          <p className="mb-1 text-sm font-medium text-gray-500 dark:text-gray-400">
            Total Sessions
          </p>
          <p className="text-3xl font-bold text-[#111218] dark:text-white">
            {stats?.totalSessions ?? 0}
          </p>
        </CardContent>
      </Card>
      <Card className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800/30">
        <CardContent className="p-4">
          <p className="mb-1 text-sm font-medium text-gray-500 dark:text-gray-400">
            Last Session
          </p>
          <p className="text-3xl font-bold text-[#111218] dark:text-white">
            {stats?.lastSessionDate
              ? new Date(stats.lastSessionDate).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })
              : "N/A"}
          </p>
        </CardContent>
      </Card>
      <Card className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800/30">
        <CardContent className="p-4">
          <p className="mb-1 text-sm font-medium text-gray-500 dark:text-gray-400">
            Processing Status
          </p>
          <p className="text-3xl font-bold text-[#111218] dark:text-white">
            {stats?.pendingCount ?? 0} Pending
          </p>
        </CardContent>
      </Card>
    </section>
  );
}
