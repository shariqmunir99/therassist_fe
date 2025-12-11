import { getCurrentUser } from "@/lib/auth/getCurrentUser";
import { redirect } from "next/navigation";
import { StatsCard } from "./_components/stats-card";
import { UpcomingSessionsCard } from "./_components/upcoming-sessions-card";
import { ClientsAttentionCard } from "./_components/clients-attention-card";
import { RecentSessionsTable } from "./_components/recent-sessions-table";
import { QuickActionsCard } from "./_components/quick-actions-card";

export default async function TherapistDashboard() {
  const user = await getCurrentUser();

  //   if (!user || user.role !== "therapist") {
  //     redirect("/login");
  //   }

  // Mock data - replace with actual API calls
  const stats = [
    {
      title: "Today's Sessions",
      value: 5,
      trend: { value: "1 more than yesterday", isPositive: true },
    },
    {
      title: "Unread Messages",
      value: 8,
      trend: { value: "2 new today", isPositive: true },
    },
    {
      title: "Notes to Complete",
      value: 3,
      trend: { value: "1 new from today", isPositive: true },
    },
  ];

  const upcomingSessions = [
    {
      id: "1",
      clientName: "Alex Ray",
      startTime: "10:00 AM",
      endTime: "11:00 AM",
      type: "video" as const,
    },
    {
      id: "2",
      clientName: "Jordan Smith",
      startTime: "11:30 AM",
      endTime: "12:30 PM",
      type: "video" as const,
    },
    {
      id: "3",
      clientName: "Team Consultation",
      startTime: "1:00 PM",
      endTime: "1:30 PM",
      type: "group" as const,
    },
  ];

  const clientsRequiringAttention = [
    {
      id: "1",
      name: "Maya Joshi",
      status: "Flagged Survey Response",
      statusType: "warning" as const,
    },
    {
      id: "2",
      name: "Ben Carter",
      status: "Missed Appointment",
      statusType: "error" as const,
    },
    {
      id: "3",
      name: "Sarah Chen",
      status: "New Message Received",
      statusType: "info" as const,
    },
  ];

  const recentSessions = [
    {
      id: "1",
      clientName: "Casey Miller",
      date: "Oct 26, 2023",
      duration: "50 min",
      noteStatus: "completed" as const,
    },
    {
      id: "2",
      clientName: "Leo Martinez",
      date: "Oct 26, 2023",
      duration: "50 min",
      noteStatus: "draft" as const,
    },
    {
      id: "3",
      clientName: "Riley Davis",
      date: "Oct 25, 2023",
      duration: "50 min",
      noteStatus: "completed" as const,
    },
    {
      id: "4",
      clientName: "Nora Evans",
      date: "Oct 25, 2023",
      duration: "25 min",
      noteStatus: "pending" as const,
    },
  ];

  const quickActions = [
    {
      id: "1",
      label: "New Note",
      icon: "📝",
      href: "#",
    },
    {
      id: "2",
      label: "Schedule Session",
      icon: "📅",
      href: "#",
    },
    {
      id: "3",
      label: "Add Client",
      icon: "👤",
      href: "#",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="col-span-3 lg:col-span-1 flex flex-col gap-6">
          <UpcomingSessionsCard sessions={upcomingSessions} />
          <ClientsAttentionCard clients={clientsRequiringAttention} />
        </div>

        {/* Right Column */}
        <div className="col-span-3 lg:col-span-2 flex flex-col gap-6">
          <RecentSessionsTable sessions={recentSessions} />
          <QuickActionsCard actions={quickActions} />
        </div>
      </div>
    </div>
  );
}
