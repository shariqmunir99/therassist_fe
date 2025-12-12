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
    <Card className="flex flex-col items-center justify-center rounded-lg border border-gray-200 bg-white p-6 text-center shadow-sm">
      <CardHeader className="p-0">
        <CardTitle className="text-base font-bold text-[#111318]">
          Sentiment Score
        </CardTitle>
        <CardDescription className="text-sm text-[#616e89] mb-2">
          Overall emotional tone.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0 mt-4">
        <p className={`text-5xl font-bold ${getScoreColor(score)}`}>{score}</p>
        <p className="mt-2 text-sm font-medium text-gray-500">{label}</p>
      </CardContent>
    </Card>
  );
}
