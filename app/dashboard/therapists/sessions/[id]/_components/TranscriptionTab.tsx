"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface TranscriptionTabProps {
  transcription?: string;
}

export function TranscriptionTab({ transcription }: TranscriptionTabProps) {
  return (
    <div className="py-8">
      <Card className="rounded-lg border border-gray-200 bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="text-base font-bold text-[#111318]">
            Session Transcription
          </CardTitle>
          <CardDescription className="text-sm text-[#616e89]">
            Full transcript of the therapy session.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {transcription ? (
            <div className="prose max-w-none">
              <p className="text-sm leading-relaxed text-[#111318] whitespace-pre-wrap">
                {transcription}
              </p>
            </div>
          ) : (
            <div className="flex items-center justify-center py-12 text-center">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="mx-auto h-12 w-12 text-gray-400"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                  />
                </svg>
                <p className="mt-4 text-sm font-medium text-gray-900">
                  No transcription available
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  The transcription for this session is not yet available.
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
