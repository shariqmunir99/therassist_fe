"use client";

import { Line, LineChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import type { SentimentDataPoint } from "../../models/ClientInsights";

interface SentimentTrendChartProps {
  data: SentimentDataPoint[];
}

const chartConfig = {
  score: {
    label: "Sentiment Score",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function SentimentTrendChart({ data }: SentimentTrendChartProps) {
  return (
    <Card className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 shadow-soft">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-[#111218] dark:text-white">
          Sentiment Trend Over Time
        </CardTitle>
        <CardDescription className="text-sm text-gray-500 dark:text-gray-400">
          Positive, negative, and neutral sentiment across sessions.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-64 w-full">
          <LineChart
            data={data}
            margin={{ top: 5, right: 10, left: 10, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              className="stroke-gray-200 dark:stroke-gray-700"
            />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              className="text-xs text-gray-500 dark:text-gray-400"
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              domain={[-2, 2]}
              ticks={[-1, 0, 1]}
              className="text-xs text-gray-500 dark:text-gray-400"
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              type="monotone"
              dataKey="score"
              stroke="var(--chart-1)"
              strokeWidth={2}
              dot={{
                fill: "var(--chart-1)",
                strokeWidth: 2,
                r: 4,
                stroke: "var(--background)",
              }}
              activeDot={{ r: 6 }}
              connectNulls
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
