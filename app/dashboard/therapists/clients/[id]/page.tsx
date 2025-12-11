"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useClient, ClientInsights } from "@/modules/client";
import { EditClientModal } from "@/modules/client/components/EditClientModal";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { AGE_GROUPS } from "@/modules/client/models/Client";
import { Upload, MoreVertical } from "lucide-react";

interface ClientDetailPageProps {
  params: {
    id: string;
  };
}

export default function ClientDetailPage({ params }: ClientDetailPageProps) {
  const router = useRouter();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"sessions" | "insights">(
    "sessions"
  );
  const { data: client, isLoading, error } = useClient(params.id);

  const ageGroupLabel = client
    ? AGE_GROUPS.find((g) => g.value === client.ageGroup)?.label ||
      client.ageGroup
    : "";

  // Mock data for demonstration
  const mockSessions = [
    {
      id: "SES-012",
      date: "Oct 26, 2023",
      duration: "45 min",
      status: "Processed",
    },
    {
      id: "SES-011",
      date: "Oct 19, 2023",
      duration: "50 min",
      status: "Pending",
    },
    {
      id: "SES-010",
      date: "Oct 12, 2023",
      duration: "45 min",
      status: "Pending",
    },
    {
      id: "SES-009",
      date: "Oct 05, 2023",
      duration: "55 min",
      status: "Error",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Processed":
        return "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200";
      case "Pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-200";
      case "Error":
        return "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700/50 dark:text-gray-200";
    }
  };

  if (error) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">
            Failed to load client details. Please try again.
          </p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-8 space-y-6">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (!client) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-8">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-yellow-800">Client not found.</p>
        </div>
      </div>
    );
  }

  return (
    <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8">
      <div
        className={`mx-auto ${
          activeTab === "insights" ? "max-w-7xl" : "max-w-5xl"
        }`}
      >
        {/* Breadcrumb */}
        <div className="mb-6 flex flex-wrap items-center gap-2">
          <Link
            href="/dashboard/therapists/clients"
            className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-primary"
          >
            Clients
          </Link>
          <span className="text-sm text-gray-400 dark:text-gray-500">/</span>
          <span className="text-sm font-medium text-[#111218] dark:text-white">
            {client.alias}
          </span>
        </div>

        {/* Header Section */}
        <section className="mb-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex flex-col gap-3">
              <h1 className="text-4xl font-black leading-tight tracking-[-0.033em] text-[#111218] dark:text-white">
                {client.alias}
              </h1>
              <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                {ageGroupLabel}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                onClick={() => setIsEditModalOpen(true)}
                className="flex h-10 min-w-[84px] items-center justify-center gap-2"
              >
                <Upload className="h-5 w-5" />
                <span>Upload Session</span>
              </Button>
              <Button variant="outline" size="icon" className="h-10 w-10">
                <MoreVertical className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Tags */}
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <div className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-full bg-green-100 dark:bg-green-900/50 px-3">
              <div className="h-2 w-2 rounded-full bg-green-700 dark:bg-green-300" />
              <p className="text-sm font-medium text-green-800 dark:text-green-200">
                Low Risk
              </p>
            </div>
            <div className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-full bg-gray-200 dark:bg-gray-700/50 px-3">
              <p className="text-sm font-medium text-[#111218] dark:text-gray-200">
                Anxiety
              </p>
            </div>
            <div className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-full bg-gray-200 dark:bg-gray-700/50 px-3">
              <p className="text-sm font-medium text-[#111218] dark:text-gray-200">
                CBT
              </p>
            </div>
          </div>

          {/* Background Notes */}
          <p className="mt-4 max-w-3xl text-base font-normal leading-normal text-gray-600 dark:text-gray-400">
            Background Notes: Client has been showing progress in managing
            anxiety through cognitive behavioral therapy techniques. Initial
            sessions focused on identifying triggers...
          </p>
        </section>

        {/* Stats Cards */}
        <section className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          <Card className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800/30">
            <CardContent className="p-4">
              <p className="mb-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                Total Sessions
              </p>
              <p className="text-3xl font-bold text-[#111218] dark:text-white">
                12
              </p>
            </CardContent>
          </Card>
          <Card className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800/30">
            <CardContent className="p-4">
              <p className="mb-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                Last Session
              </p>
              <p className="text-3xl font-bold text-[#111218] dark:text-white">
                Oct 26, 2023
              </p>
            </CardContent>
          </Card>
          <Card className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800/30">
            <CardContent className="p-4">
              <p className="mb-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                Processing Status
              </p>
              <p className="text-3xl font-bold text-[#111218] dark:text-white">
                2 Pending
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Tabs and Table Section */}
        <section>
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="-mb-px flex space-x-6" aria-label="Tabs">
              <button
                onClick={() => setActiveTab("sessions")}
                className={`whitespace-nowrap border-b-2 px-1 py-3 text-sm font-semibold ${
                  activeTab === "sessions"
                    ? "border-primary text-primary"
                    : "border-transparent text-gray-500 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-500 hover:text-gray-700 dark:hover:text-gray-200"
                }`}
              >
                Sessions
              </button>
              <button
                onClick={() => setActiveTab("insights")}
                className={`whitespace-nowrap border-b-2 px-1 py-3 text-sm font-semibold ${
                  activeTab === "insights"
                    ? "border-primary text-primary"
                    : "border-transparent text-gray-500 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-500 hover:text-gray-700 dark:hover:text-gray-200"
                }`}
              >
                Insights
              </button>
            </nav>
          </div>

          {/* Sessions Table */}
          {activeTab === "sessions" && (
            <div className="mt-6">
              <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800/30">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-800/50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400"
                      >
                        Session ID
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400"
                      >
                        Date
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400"
                      >
                        Duration
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400"
                      >
                        Status
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                    {mockSessions.map((session) => (
                      <tr key={session.id}>
                        <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-[#111218] dark:text-white">
                          {session.id}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                          {session.date}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                          {session.duration}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm">
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(
                              session.status
                            )}`}
                          >
                            {session.status}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                          <button className="text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary">
                            <MoreVertical className="h-5 w-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Insights Tab */}
          {activeTab === "insights" && <ClientInsights clientId={params.id} />}
        </section>
      </div>

      {/* Edit Modal */}
      <EditClientModal
        client={client}
        open={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
      />
    </main>
  );
}
