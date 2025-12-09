import { getCurrentUser } from '@/lib/auth/getCurrentUser';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard | Therassist',
  description: 'Your Therassist dashboard',
};

export default async function DashboardPage() {
  const user = await getCurrentUser();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Welcome back, {user?.name}!</h1>
        <p className="text-gray-600 mt-1">Here's what's happening with your account today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-2">Total Sessions</h3>
          <p className="text-3xl font-bold text-blue-600">24</p>
          <p className="text-sm text-gray-600 mt-1">+3 this week</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-2">Active Clients</h3>
          <p className="text-3xl font-bold text-green-600">12</p>
          <p className="text-sm text-gray-600 mt-1">+2 new clients</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-2">Upcoming Sessions</h3>
          <p className="text-3xl font-bold text-purple-600">5</p>
          <p className="text-sm text-gray-600 mt-1">Next: Tomorrow 2PM</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center justify-between py-3 border-b last:border-0">
              <div>
                <p className="font-medium">Session with Client {i}</p>
                <p className="text-sm text-gray-600">Completed 2 hours ago</p>
              </div>
              <button className="text-blue-600 hover:text-blue-700 text-sm">
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
