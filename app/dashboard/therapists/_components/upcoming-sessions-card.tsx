interface UpcomingSession {
  id: string;
  clientName: string;
  startTime: string;
  endTime: string;
  type: "video" | "group";
}

interface UpcomingSessionsCardProps {
  sessions: UpcomingSession[];
}

export function UpcomingSessionsCard({ sessions }: UpcomingSessionsCardProps) {
  return (
    <div className="bg-white border border-slate-200 p-6 rounded-lg shadow-sm">
      <h2 className="text-slate-800 text-lg font-bold mb-4">
        Upcoming Sessions
      </h2>
      <div className="grid grid-cols-[auto_1fr] gap-x-4">
        {sessions.map((session, index) => (
          <div key={session.id} className="contents">
            <div className="flex flex-col items-center gap-1 pt-1">
              {index > 0 && <div className="w-px bg-slate-200 h-6"></div>}
              <div
                className={`p-2 rounded-full ${
                  index === 0
                    ? "bg-blue-100 text-blue-600"
                    : "bg-slate-100 text-slate-500"
                }`}
              >
                <span className="text-base">
                  {session.type === "video" ? "📹" : "👥"}
                </span>
              </div>
              {index < sessions.length - 1 && (
                <div className="w-px bg-slate-200 h-full"></div>
              )}
            </div>
            <div
              className={`flex flex-col ${
                index < sessions.length - 1
                  ? "pb-6 border-b border-slate-200"
                  : "py-6"
              }`}
            >
              <p className="text-slate-800 text-base font-medium">
                Session with {session.clientName}
              </p>
              <p className="text-slate-500 text-sm">
                {session.startTime} - {session.endTime}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
