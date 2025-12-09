import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  return {
    title: `Therapist Profile | Therassist`,
    description: 'View therapist profile and book a session',
  };
}

export default function TherapistProfilePage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="flex items-start gap-6 mb-6">
            <div className="w-32 h-32 rounded-full bg-gray-200" />
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-3xl font-bold mb-2">Dr. Therapist Name</h1>
                  <p className="text-green-600 text-sm">✓ Verified Professional</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">$120/hr</p>
                  <p className="text-sm text-gray-600">⭐ 4.9 (120 reviews)</p>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {['Anxiety', 'Depression', 'Trauma'].map((spec) => (
                  <span
                    key={spec}
                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-2">About</h2>
              <p className="text-gray-700">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. With over 10 years
                of experience in helping clients overcome anxiety and depression, I provide
                a safe and supportive environment for healing and growth.
              </p>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-2">Credentials</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>PhD in Clinical Psychology</li>
                <li>Licensed Mental Health Counselor (LMHC)</li>
                <li>Certified Cognitive Behavioral Therapist</li>
              </ul>
            </div>
            
            <div className="pt-4">
              <button className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-semibold">
                Book a Session
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
