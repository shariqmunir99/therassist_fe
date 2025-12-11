"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { KeywordData } from "../../models/ClientInsights";

interface KeywordFrequencyCloudProps {
  keywords: KeywordData[];
}

const sizeClasses = {
  sm: "text-xs px-2.5 py-1",
  md: "text-sm px-3 py-1",
  lg: "text-sm px-3 py-1 font-medium",
};

export function KeywordFrequencyCloud({
  keywords,
}: KeywordFrequencyCloudProps) {
  return (
    <Card className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 shadow-soft">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-[#111218] dark:text-white">
          Keyword Frequency
        </CardTitle>
        <CardDescription className="text-sm text-gray-500 dark:text-gray-400">
          Commonly used words and phrases.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {keywords.map((keyword) => (
            <span
              key={keyword.word}
              className={`rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 ${
                sizeClasses[keyword.size]
              }`}
            >
              {keyword.word}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
