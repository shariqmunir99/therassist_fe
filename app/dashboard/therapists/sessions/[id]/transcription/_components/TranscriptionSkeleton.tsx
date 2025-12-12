"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function TranscriptionSkeleton() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-8">
      <div className="flex flex-col gap-6">
        {/* Client message skeleton - left aligned */}
        <div className="flex w-full max-w-xl justify-start">
          <div className="flex flex-col gap-2 w-full">
            <Skeleton className="h-4 w-32" />
            <div className="rounded-xl rounded-tl-none bg-white dark:bg-[#1A202C] p-4 shadow-sm w-full">
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-4 w-12" />
                  <Skeleton className="h-5 w-16 rounded-full" />
                </div>
                <Skeleton className="h-16 w-full" />
                <div className="flex items-center gap-3 pt-2">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <Skeleton className="h-1 w-full" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Therapist message skeleton - right aligned */}
        <div className="flex w-full max-w-xl justify-end self-end">
          <div className="flex flex-col gap-2 w-full items-end">
            <Skeleton className="h-4 w-40" />
            <div className="rounded-xl rounded-tr-none bg-primary/10 dark:bg-primary/20 p-4 shadow-sm w-full">
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-4 w-12" />
                  <Skeleton className="h-5 w-20 rounded-full" />
                </div>
                <Skeleton className="h-20 w-full" />
                <div className="flex items-center gap-3 pt-2">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <Skeleton className="h-1 w-full" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Client message skeleton */}
        <div className="flex w-full max-w-xl justify-start">
          <div className="flex flex-col gap-2 w-full">
            <Skeleton className="h-4 w-32" />
            <div className="rounded-xl rounded-tl-none bg-white dark:bg-[#1A202C] p-4 shadow-sm w-full">
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-4 w-12" />
                  <Skeleton className="h-5 w-16 rounded-full" />
                </div>
                <Skeleton className="h-12 w-full" />
                <div className="flex items-center gap-3 pt-2">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <Skeleton className="h-1 w-full" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Therapist message skeleton */}
        <div className="flex w-full max-w-xl justify-end self-end">
          <div className="flex flex-col gap-2 w-full items-end">
            <Skeleton className="h-4 w-40" />
            <div className="rounded-xl rounded-tr-none bg-primary/10 dark:bg-primary/20 p-4 shadow-sm w-full">
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-4 w-12" />
                  <Skeleton className="h-5 w-20 rounded-full" />
                </div>
                <Skeleton className="h-16 w-full" />
                <div className="flex items-center gap-3 pt-2">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <Skeleton className="h-1 w-full" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Client message skeleton */}
        <div className="flex w-full max-w-xl justify-start">
          <div className="flex flex-col gap-2 w-full">
            <Skeleton className="h-4 w-32" />
            <div className="rounded-xl rounded-tl-none bg-white dark:bg-[#1A202C] p-4 shadow-sm w-full">
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-4 w-12" />
                  <Skeleton className="h-5 w-16 rounded-full" />
                </div>
                <Skeleton className="h-14 w-full" />
                <div className="flex items-center gap-3 pt-2">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <Skeleton className="h-1 w-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
