import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Sessions | Therassist',
  description: 'View your therapy sessions',
};

export default function ClientSessionsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">My Sessions</h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Book Session
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-start justify-between">
              <div className="flex gap-4">
                <div className="w-16 h-16 rounded-full bg-gray-200" />
                <div>
                  <h3 className="text-lg font-semibold mb-1">Dr. Therapist {i}</h3>
                  <p className="text-sm text-gray-600">December {i * 5}, 2025 • 60 minutes</p>
                  <div className="mt-2">
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                      Completed
                    </span>
                  </div>
                </div>
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
