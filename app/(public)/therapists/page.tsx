import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Find Therapists | Therassist',
  description: 'Search and find qualified therapists',
};

export default function TherapistsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Find a Therapist</h1>
      
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by name, specialization..."
          className="w-full px-4 py-2 border rounded-md"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="border rounded-lg p-6 shadow-sm">
            <div className="w-16 h-16 rounded-full bg-gray-200 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Dr. Therapist {i}</h3>
            <p className="text-sm text-gray-600 mb-3">
              Specializing in anxiety, depression, and trauma therapy
            </p>
            <div className="flex justify-between items-center">
              <span className="font-bold">$120/hr</span>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                View Profile
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
