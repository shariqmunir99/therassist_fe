"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { TherapeuticTheme } from "../../models/ClientInsights";

interface TherapeuticThemesTimelineProps {
  themes: TherapeuticTheme[];
}

export function TherapeuticThemesTimeline({
  themes,
}: TherapeuticThemesTimelineProps) {
  return (
    <Card className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 shadow-soft">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-[#111218] dark:text-white">
          Therapeutic Themes Over Time
        </CardTitle>
        <CardDescription className="text-sm text-gray-500 dark:text-gray-400">
          Progression of key discussion themes.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative space-y-8 before:absolute before:inset-y-0 before:left-[7px] before:w-0.5 before:bg-gray-200 dark:before:bg-gray-700">
          {themes.map((theme, index) => (
            <div key={theme.id} className="relative pl-8">
              <div className="absolute left-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 ring-4 ring-white dark:ring-gray-900">
                <div className="h-2 w-2 rounded-full bg-white" />
              </div>
              <div>
                <p className="text-xs font-medium text-blue-600 dark:text-blue-400">
                  {theme.sessionRange}
                </p>
                <h4 className="mt-1 text-sm font-semibold text-[#111218] dark:text-white">
                  {theme.title}
                </h4>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  {theme.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
