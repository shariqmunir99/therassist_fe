"use client";

import { use, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useClient, ClientInsights, ClientStatsCards } from "@/modules/client";
import { EditClientModal } from "@/modules/client/components/EditClientModal";
import { UploadSessionModal } from "@/modules/session/components/UploadSessionModal";
import { ClientSessionsTable } from "@/modules/session/components/ClientSessionsTable";
import { useClients } from "@/modules/client/hooks/useClients";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { AGE_GROUPS } from "@/modules/client/models/Client";
import { Upload, Pencil } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

interface ClientDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function ClientDetailPage({ params }: ClientDetailPageProps) {
  const { id } = use(params);
  const router = useRouter();
  const { getUserId } = useAuth();
  const [therapistId, setTherapistId] = useState<string | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isUploadSessionModalOpen, setIsUploadSessionModalOpen] =
    useState(false);
  const [activeTab, setActiveTab] = useState<"sessions" | "insights">(
    "sessions"
  );
  const { data: client, isLoading, error } = useClient(id);

  // Get therapist ID from auth
  useEffect(() => {
    const userId = getUserId();
    if (!userId) {
      router.push("/login");
    } else {
      setTherapistId(userId);
    }
  }, [getUserId, router]);

  // Fetch clients for the upload modal (just pass the current client)
  const { data: clientsResponse } = useClients({
    therapistId: client?.therapistId || "",
    page: 1,
    limit: 100,
  });

  const clients = clientsResponse?.data || [];

  const ageGroupLabel = client
    ? AGE_GROUPS.find((g) => g.value === client.ageGroup)?.label ||
      client.ageGroup
    : "";

  // Error state - client failed to load
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

  // Not found state
  if (!isLoading && !client) {
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
        {isLoading ? (
          <div className="mb-6">
            <Skeleton className="h-5 w-48" />
          </div>
        ) : (
          <div className="mb-6 flex flex-wrap items-center gap-2">
            <Link
              href="/dashboard/therapists/clients"
              className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-primary"
            >
              Clients
            </Link>
            <span className="text-sm text-gray-400 dark:text-gray-500">/</span>
            <span className="text-sm font-medium text-[#111218] dark:text-white">
              {client?.alias}
            </span>
          </div>
        )}

        {/* Header Section */}
        <section className="mb-8">
          {isLoading ? (
            <>
              <div className="mb-4">
                <Skeleton className="mb-3 h-10 w-64" />
                <Skeleton className="h-6 w-40" />
              </div>
              <div className="flex gap-2">
                <Skeleton className="h-8 w-24" />
                <Skeleton className="h-8 w-32" />
              </div>
              <Skeleton className="mt-4 h-16 w-full max-w-3xl" />
            </>
          ) : client ? (
            <>
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
                    onClick={() => setIsUploadSessionModalOpen(true)}
                    className="flex h-10 min-w-[84px] items-center justify-center gap-2"
                  >
                    <Upload className="h-5 w-5" />
                    <span>Upload Session</span>
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setIsEditModalOpen(true)}
                    className="h-10 gap-2"
                  >
                    <Pencil className="h-4 w-4" />
                    <span>Edit Client</span>
                  </Button>
                </div>
              </div>

              {/* Tags */}
              <div className="mt-4 flex flex-wrap items-center gap-2">
                {/* Risk Level Badge */}
                {client.riskLevel && (
                  <div
                    className={`flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-full px-3 ${
                      client.riskLevel === "low"
                        ? "bg-green-100 dark:bg-green-900/50"
                        : client.riskLevel === "medium"
                        ? "bg-yellow-100 dark:bg-yellow-900/50"
                        : "bg-red-100 dark:bg-red-900/50"
                    }`}
                  >
                    <div
                      className={`h-2 w-2 rounded-full ${
                        client.riskLevel === "low"
                          ? "bg-green-700 dark:bg-green-300"
                          : client.riskLevel === "medium"
                          ? "bg-yellow-700 dark:bg-yellow-300"
                          : "bg-red-700 dark:bg-red-300"
                      }`}
                    />
                    <p
                      className={`text-sm font-medium ${
                        client.riskLevel === "low"
                          ? "text-green-800 dark:text-green-200"
                          : client.riskLevel === "medium"
                          ? "text-yellow-800 dark:text-yellow-200"
                          : "text-red-800 dark:text-red-200"
                      }`}
                    >
                      {client.riskLevel === "low"
                        ? "Low Risk"
                        : client.riskLevel === "medium"
                        ? "Medium Risk"
                        : "High Risk"}
                    </p>
                  </div>
                )}
                {/* Client Tags */}
                {client.tags &&
                  client.tags.map((tag) => (
                    <div
                      key={tag}
                      className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-full bg-gray-200 dark:bg-gray-700/50 px-3"
                    >
                      <p className="text-sm font-medium text-[#111218] dark:text-gray-200">
                        {tag}
                      </p>
                    </div>
                  ))}
              </div>

              {/* Background Notes */}
              {client.notes && (
                <p className="mt-4 max-w-3xl text-base font-normal leading-normal text-gray-600 dark:text-gray-400">
                  <span className="font-semibold">Background Notes:</span>{" "}
                  {client.notes}
                </p>
              )}
            </>
          ) : null}
        </section>

        {/* Stats Cards - Loads independently */}
        {!isLoading && client && <ClientStatsCards clientId={id} />}

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

          {/* Sessions Table - Loads independently */}
          {activeTab === "sessions" && !isLoading && client && therapistId && (
            <ClientSessionsTable clientId={id} therapistId={therapistId} />
          )}

          {/* Insights Tab - Loads independently */}
          {activeTab === "insights" && !isLoading && client && (
            <ClientInsights clientId={id} />
          )}
        </section>
      </div>

      {/* Edit Modal */}
      {client && (
        <EditClientModal
          client={client}
          open={isEditModalOpen}
          onOpenChange={setIsEditModalOpen}
        />
      )}

      {/* Upload Session Modal */}
      <UploadSessionModal
        isOpen={isUploadSessionModalOpen}
        onClose={() => setIsUploadSessionModalOpen(false)}
        selectedClientId={id}
        clients={clients}
      />
    </main>
  );
}
