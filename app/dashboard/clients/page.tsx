import { getCurrentUser } from "@/lib/auth/getCurrentUser";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | Therassist",
  description: "Your client dashboard",
};

export default async function ClientDashboard() {
  const user = await getCurrentUser();

  if (!user || user.role !== "client") {
    redirect("/login");
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome back, {user.name || "Client"}
        </h1>
        <p className="text-muted-foreground">
          Manage your therapy sessions and appointments
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {/* Dashboard stats/widgets will go here */}
        <div className="rounded-lg border bg-card p-6">
          <h3 className="text-sm font-medium text-muted-foreground">
            Upcoming Sessions
          </h3>
          <p className="mt-2 text-3xl font-bold">0</p>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <h3 className="text-sm font-medium text-muted-foreground">
            Total Sessions
          </h3>
          <p className="mt-2 text-3xl font-bold">0</p>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <h3 className="text-sm font-medium text-muted-foreground">
            Hours Completed
          </h3>
          <p className="mt-2 text-3xl font-bold">0</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Upcoming Sessions</h2>
            <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Book Session
            </button>
          </div>
          <p className="text-sm text-muted-foreground">
            No upcoming sessions scheduled
          </p>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Sessions</h2>
          <p className="text-sm text-muted-foreground">
            No recent sessions to display
          </p>
        </div>
      </div>
    </div>
  );
}
