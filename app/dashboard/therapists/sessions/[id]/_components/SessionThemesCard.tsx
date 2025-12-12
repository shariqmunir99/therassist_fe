"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface SessionThemesCardProps {
  themes: string[];
}

export function SessionThemesCard({ themes }: SessionThemesCardProps) {
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
        <div className="flex flex-wrap gap-2">
          {themes.map((theme, index) => (
            <span
              key={index}
              className={`rounded-full px-3 py-1.5 text-sm font-medium ${
                index === 0
                  ? "bg-blue-100 text-blue-800"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {theme}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
