"use client";

import { Bar, BarChart, XAxis, YAxis } from "recharts";
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

interface ChartDataItem {
  name: string;
  value: number;
  fill: string;
}

interface BarChartCardProps {
  title: string;
  description: string;
  data: ChartDataItem[];
  layout?: "horizontal" | "vertical";
  className?: string;
}

export function BarChartCard({
  title,
  description,
  data,
  layout = "vertical",
  className = "",
}: BarChartCardProps) {
  // Generate chart config dynamically from data
  const chartConfig = data.reduce((acc, item) => {
    acc[item.name] = {
      label: item.name,
      color: item.fill,
    };
    return acc;
  }, {} as ChartConfig);

  return (
    <Card
      className={`flex h-full flex-col rounded-lg border border-gray-200 bg-white shadow-sm ${className}`}
    >
      <CardHeader>
        <CardTitle className="text-base font-bold text-[#111318]">
          {title}
        </CardTitle>
        <CardDescription className="text-sm text-[#616e89]">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col">
        <div className="flex flex-1 items-center justify-center">
          <ChartContainer config={chartConfig} className="h-56 w-full">
            <BarChart
              data={data}
              layout={layout}
              margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
            >
              {layout === "horizontal" ? (
                <>
                  <XAxis type="number" />
                  <YAxis type="category" dataKey="name" />
                </>
              ) : (
                <>
                  <XAxis type="category" dataKey="name" />
                  <YAxis type="number" />
                </>
              )}
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar dataKey="value" radius={4} />
            </BarChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}
