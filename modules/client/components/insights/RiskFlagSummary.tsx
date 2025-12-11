"use client";

import { AlertTriangle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { RiskFlag } from "../../models/ClientInsights";

interface RiskFlagSummaryProps {
  riskFlag: RiskFlag;
}

export function RiskFlagSummary({ riskFlag }: RiskFlagSummaryProps) {
  if (!riskFlag.detected) {
    return null;
  }

  return (
    <Card className="rounded-xl border border-yellow-300 dark:border-yellow-700 bg-yellow-50 dark:bg-yellow-900/30 shadow-soft">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="text-sm font-semibold text-yellow-900 dark:text-yellow-200">
              {riskFlag.message}
            </h3>
            {riskFlag.recommendation && (
              <p className="mt-1 text-sm text-yellow-800 dark:text-yellow-300">
                {riskFlag.recommendation}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
