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

interface ChartDataItem {
  name: string;
  value: number;
  fill: string;
}

interface PieChartCardProps {
  title: string;
  description: string;
  data: ChartDataItem[];
  innerRadius?: number;
  outerRadius?: number;
  showCenterLabel?: boolean;
  centerLabel?: string;
  showLegend?: boolean;
  className?: string;
}

export function PieChartCard({
  title,
  description,
  data,
  innerRadius = 0,
  outerRadius = 80,
  showCenterLabel = false,
  centerLabel = "",
  showLegend = true,
  className = "",
}: PieChartCardProps) {
  // Generate chart config dynamically from data
  const chartConfig = data.reduce((acc, item, index) => {
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
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                strokeWidth={0}
              >
                {showCenterLabel && centerLabel && (
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
                              className="fill-[#111318] text-xl font-bold"
                            >
                              {centerLabel}
                            </tspan>
                          </text>
                        );
                      }
                    }}
                  />
                )}
              </Pie>
            </PieChart>
          </ChartContainer>
        </div>
        {showLegend && (
          <div className="mt-4 space-y-2 text-sm">
            {data.map((item) => (
              <div
                key={item.name}
                className="flex items-center justify-between"
              >
                <span className="flex items-center gap-2">
                  <span
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: item.fill }}
                  />
                  <span className="text-gray-700">{item.name}</span>
                </span>
                <span className="font-medium text-[#111318]">
                  {item.value}%
                </span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
