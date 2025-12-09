import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth/getCurrentUser';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  
  if (!user) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <h1 className="text-xl font-bold">Therassist</h1>
              <div className="flex gap-4">
                <a href="/dashboard" className="text-gray-700 hover:text-blue-600">
                  Dashboard
                </a>
                {user.role === 'therapist' && (
                  <>
                    <a href="/dashboard/therapists/clients" className="text-gray-700 hover:text-blue-600">
                      Clients
                    </a>
                    <a href="/dashboard/therapists/sessions" className="text-gray-700 hover:text-blue-600">
                      Sessions
                    </a>
                    <a href="/dashboard/therapists/availability" className="text-gray-700 hover:text-blue-600">
                      Availability
                    </a>
                  </>
                )}
                {user.role === 'client' && (
                  <a href="/dashboard/clients/sessions" className="text-gray-700 hover:text-blue-600">
                    My Sessions
                  </a>
                )}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">{user.name}</span>
              <button className="text-sm text-red-600 hover:text-red-700">
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
}
