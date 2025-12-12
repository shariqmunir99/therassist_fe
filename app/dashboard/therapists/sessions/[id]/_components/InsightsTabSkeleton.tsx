"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function InsightsTabSkeleton() {
  return (
    <div className="py-8">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left column - Charts */}
        <div className="flex flex-col gap-6 lg:col-span-2">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Emotion Distribution Skeleton */}
            <Card className="rounded-lg border border-gray-200 bg-white shadow-sm">
              <CardHeader>
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-4 w-48 mt-2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-48 w-full" />
              </CardContent>
            </Card>

            {/* Speaking Time Skeleton */}
            <Card className="rounded-lg border border-gray-200 bg-white shadow-sm">
              <CardHeader>
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-4 w-44 mt-2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-48 w-full" />
              </CardContent>
            </Card>

            {/* Utterance Count Skeleton */}
            <Card className="rounded-lg border border-gray-200 bg-white shadow-sm">
              <CardHeader>
                <Skeleton className="h-5 w-36" />
                <Skeleton className="h-4 w-40 mt-2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-48 w-full" />
              </CardContent>
            </Card>

            {/* Sentiment Score Skeleton */}
            <Card className="rounded-lg border border-gray-200 bg-white shadow-sm">
              <CardHeader>
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-4 w-48 mt-2" />
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center py-8">
                  <Skeleton className="h-24 w-24 rounded-full" />
                  <Skeleton className="h-6 w-32 mt-4" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Session Themes Skeleton */}
          <Card className="rounded-lg border border-gray-200 bg-white shadow-sm">
            <CardHeader>
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-4 w-64 mt-2" />
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Skeleton className="h-8 w-32 rounded-full" />
                <Skeleton className="h-8 w-40 rounded-full" />
                <Skeleton className="h-8 w-36 rounded-full" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right column - Therapist Notes Skeleton */}
        <div className="flex flex-col gap-6 lg:col-span-1">
          <Card className="rounded-lg border border-gray-200 bg-white shadow-sm">
            <CardHeader>
              <Skeleton className="h-5 w-36" />
              <Skeleton className="h-4 w-48 mt-2" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-64 w-full" />
              <Skeleton className="h-10 w-full mt-4" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
