import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Availability | Therassist',
  description: 'Manage your availability',
};

export default function TherapistAvailabilityPage() {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Availability</h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Add Time Slot
        </button>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Weekly Schedule</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {days.map((day) => (
            <div key={day} className="border rounded-lg p-4">
              <h3 className="font-semibold mb-3">{day}</h3>
              <div className="space-y-2">
                <div className="px-3 py-2 bg-blue-50 rounded text-sm">
                  9:00 AM - 12:00 PM
                </div>
                <div className="px-3 py-2 bg-blue-50 rounded text-sm">
                  2:00 PM - 5:00 PM
                </div>
              </div>
              <button className="w-full mt-3 text-sm text-blue-600 hover:text-blue-700">
                + Add slot
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
