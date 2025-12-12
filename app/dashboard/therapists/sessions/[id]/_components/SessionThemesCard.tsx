"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface SessionThemesCardProps {
  theme: string;
  themeExplanation?: string | null;
}

export function SessionThemesCard({
  theme,
  themeExplanation,
}: SessionThemesCardProps) {
  return (
    <Card className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <CardHeader className="p-0 mb-4">
        <CardTitle className="text-base font-bold text-[#111318]">
          Session Theme
        </CardTitle>
        <CardDescription className="text-sm text-[#616e89]">
          Primary topic discussed during the session.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-semibold text-[#111318]">{theme}</h3>
          {themeExplanation && (
            <p className="text-sm text-[#616e89] leading-relaxed">
              {themeExplanation}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
