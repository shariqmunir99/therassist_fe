"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function SessionInfoCardSkeleton() {
  return (
    <div className="flex flex-wrap items-center justify-between gap-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-1.5">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-5 w-24" />
      </div>
      <div className="flex flex-col gap-1.5">
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-5 w-28" />
      </div>
      <div className="hidden h-10 w-px bg-gray-200 md:block"></div>
      <div className="flex flex-col gap-1.5">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-5 w-32" />
      </div>
      <div className="hidden h-10 w-px bg-gray-200 md:block"></div>
      <div className="flex flex-col gap-1.5">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-5 w-20" />
      </div>
      <div className="hidden h-10 w-px bg-gray-200 md:block"></div>
      <div className="flex flex-col gap-1.5">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-5 w-24" />
      </div>
      <div className="hidden h-10 w-px bg-gray-200 md:block"></div>
      <div className="flex items-center gap-3">
        <Skeleton className="h-3 w-12" />
        <Skeleton className="h-8 w-20 rounded-full" />
      </div>
    </div>
  );
}
