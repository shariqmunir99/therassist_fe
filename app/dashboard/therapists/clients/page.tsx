import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Clients | Therassist',
  description: 'Manage your clients',
};

export default function TherapistClientsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">My Clients</h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Add Client
        </button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b">
          <input
            type="text"
            placeholder="Search clients..."
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        
        <div className="divide-y">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="p-4 hover:bg-gray-50 cursor-pointer">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gray-200" />
                  <div>
                    <h3 className="font-semibold">Client {i}</h3>
                    <p className="text-sm text-gray-600">client{i}@example.com</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">12 sessions</p>
                  <p className="text-xs text-gray-600">Last: 3 days ago</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
