import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sessions | Therassist',
  description: 'Manage your therapy sessions',
};

export default function TherapistSessionsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Sessions</h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Upload Session
        </button>
      </div>

      <div className="flex gap-4 mb-6">
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md">All</button>
        <button className="px-4 py-2 border rounded-md hover:bg-gray-50">Completed</button>
        <button className="px-4 py-2 border rounded-md hover:bg-gray-50">Scheduled</button>
        <button className="px-4 py-2 border rounded-md hover:bg-gray-50">Cancelled</button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-semibold">Session with Client {i}</h3>
                  <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                    Completed
                  </span>
                </div>
                <p className="text-sm text-gray-600">December {i}, 2025 • 60 minutes</p>
                <p className="text-sm text-green-600 mt-1">✓ Transcription available</p>
              </div>
              <button className="px-4 py-2 border rounded-md hover:bg-gray-50">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
