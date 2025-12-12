"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface SentimentScoreCardProps {
  score: number;
  label: string;
}

export function SentimentScoreCard({ score, label }: SentimentScoreCardProps) {
  // Determine color based on score
  const getScoreColor = (score: number) => {
    if (score >= 0.5) return "text-green-600";
    if (score >= 0) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <Card className="flex h-full flex-col rounded-lg border border-gray-200 bg-white shadow-sm">
      <CardHeader>
        <CardTitle className="text-base font-bold text-[#111318]">
          Sentiment Score
        </CardTitle>
        <CardDescription className="text-sm text-[#616e89]">
          Overall emotional tone.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          <p className={`text-5xl font-bold ${getScoreColor(score)}`}>
            {score}
          </p>
          <p className="mt-2 text-sm font-medium text-gray-500">{label}</p>
        </div>
      </CardContent>
    </Card>
  );
}
