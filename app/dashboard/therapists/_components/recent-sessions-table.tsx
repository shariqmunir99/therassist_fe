interface RecentSession {
  id: string;
  clientName: string;
  date: string;
  duration: string;
  noteStatus: "completed" | "draft" | "pending";
}

interface RecentSessionsTableProps {
  sessions: RecentSession[];
}

export function RecentSessionsTable({ sessions }: RecentSessionsTableProps) {
  const getStatusBadge = (status: RecentSession["noteStatus"]) => {
    switch (status) {
      case "completed":
        return (
          <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
            Completed
          </span>
        );
      case "draft":
        return (
          <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
            Draft
          </span>
        );
      case "pending":
        return (
          <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
            Pending
          </span>
        );
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
      <div className="p-6">
        <h2 className="text-slate-800 text-lg font-bold">Recent Sessions</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-500 uppercase text-xs">
            <tr>
              <th className="px-6 py-3 font-medium">Client</th>
              <th className="px-6 py-3 font-medium">Date</th>
              <th className="px-6 py-3 font-medium">Duration</th>
              <th className="px-6 py-3 font-medium text-center">Note Status</th>
            </tr>
          </thead>
          <tbody className="text-slate-800">
            {sessions.map((session) => (
              <tr
                key={session.id}
                className="border-t border-slate-200 hover:bg-slate-50 transition-colors duration-200"
              >
                <td className="px-6 py-4 font-medium">{session.clientName}</td>
                <td className="px-6 py-4 text-slate-500">{session.date}</td>
                <td className="px-6 py-4 text-slate-500">{session.duration}</td>
                <td className="px-6 py-4 text-center">
                  {getStatusBadge(session.noteStatus)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
