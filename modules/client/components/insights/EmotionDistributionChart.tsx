"use client";

import { Label, Pie, PieChart } from "recharts";
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
import type { EmotionDistribution } from "../../models/ClientInsights";

interface EmotionDistributionChartProps {
  data: EmotionDistribution[];
}

const chartConfig = {
  Anxiety: {
    label: "Anxiety",
    color: "var(--chart-1)",
  },
  Sadness: {
    label: "Sadness",
    color: "var(--chart-2)",
  },
  Hopelessness: {
    label: "Hopelessness",
    color: "var(--chart-3)",
  },
  Other: {
    label: "Other",
    color: "var(--chart-4)",
  },
} satisfies ChartConfig;

export function EmotionDistributionChart({
  data,
}: EmotionDistributionChartProps) {
  const totalPercentage = data.reduce((acc, curr) => acc + curr.percentage, 0);

  return (
    <Card className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 shadow-soft">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-[#111218] dark:text-white">
          Emotion Distribution
        </CardTitle>
        <CardDescription className="text-sm text-gray-500 dark:text-gray-400">
          Predominant emotions expressed.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="mx-auto h-[180px]">
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={data}
              dataKey="percentage"
              nameKey="emotion"
              innerRadius={60}
              outerRadius={80}
              strokeWidth={2}
              stroke="hsl(var(--background))"
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-xl font-bold"
                        >
                          Overall
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
        <div className="mt-4 space-y-2 text-sm">
          {data.map((item) => (
            <div
              key={item.emotion}
              className="flex items-center justify-between"
            >
              <span className="flex items-center gap-2">
                <span
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: item.fill }}
                />
                <span className="text-gray-700 dark:text-gray-300">
                  {item.emotion}
                </span>
              </span>
              <span className="font-medium text-[#111218] dark:text-white">
                {item.percentage}%
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
