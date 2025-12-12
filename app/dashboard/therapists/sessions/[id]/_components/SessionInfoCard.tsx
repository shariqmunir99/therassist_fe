"use client";

interface SessionInfoCardProps {
  patientName: string;
  sessionDate: string;
  sessionId: string;
  status: string;
}

export function SessionInfoCard({
  patientName,
  sessionDate,
  sessionId,
  status,
}: SessionInfoCardProps) {
  const statusColors: Record<string, string> = {
    completed: "bg-green-100 text-green-800",
    scheduled: "bg-blue-100 text-blue-800",
    annotated: "bg-blue-100 text-blue-800",
    cancelled: "bg-red-100 text-red-800",
    "no-show": "bg-gray-100 text-gray-800",
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-1.5">
        <p className="text-xs font-medium text-[#616e89]">PATIENT</p>
        <p className="text-base font-semibold text-[#111318]">{patientName}</p>
      </div>
      <div className="hidden h-10 w-px bg-gray-200 md:block"></div>
      <div className="flex flex-col gap-1.5">
        <p className="text-xs font-medium text-[#616e89]">SESSION DATE</p>
        <p className="text-base font-semibold text-[#111318]">{sessionDate}</p>
      </div>
      <div className="hidden h-10 w-px bg-gray-200 md:block"></div>
      <div className="flex flex-col gap-1.5">
        <p className="text-xs font-medium text-[#616e89]">SESSION ID</p>
        <p className="text-base font-semibold text-[#111318]">#{sessionId}</p>
      </div>
      <div className="hidden h-10 w-px bg-gray-200 md:block"></div>
      <div className="flex items-center gap-3">
        <p className="text-xs font-medium text-[#616e89]">STATUS</p>
        <div
          className={`flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-full px-3 ${
            statusColors[status.toLowerCase()] || statusColors["scheduled"]
          }`}
        >
          <p className="text-sm font-medium leading-normal capitalize">
            {status}
          </p>
        </div>
      </div>
    </div>
  );
}
