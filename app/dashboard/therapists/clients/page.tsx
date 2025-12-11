"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CreateClientModal } from "@/modules/client/components/CreateClientModal";
import { useClients } from "@/modules/client/hooks/useClients";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { getUserId } from "@/hooks/useAuth";
import { Search, ChevronDown, Plus, FileText } from "lucide-react";
import { AGE_GROUPS } from "@/modules/client/models/Client";

export default function TherapistClientsPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [therapistId, setTherapistId] = useState<string>("");

  useEffect(() => {
    const id = getUserId();
    if (id) {
      setTherapistId(id);
    }
  }, []);

  const { data, isLoading, error } = useClients({
    therapistId,
  });

  const filteredClients =
    data?.data.filter((client) =>
      client.alias.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

  const handleViewDetails = (clientId: string) => {
    router.push(`/dashboard/therapists/clients/${clientId}`);
  };

  if (error) {
    return (
      <div className="space-y-6">
        <h1 className="text-4xl font-black">Clients</h1>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">
            Failed to load clients. Please try again.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-0">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center gap-4 p-4">
        <h1 className="text-4xl font-black">Clients</h1>
        {therapistId && (
          <CreateClientModal
            therapistId={therapistId}
            trigger={
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Create Client
              </Button>
            }
          />
        )}
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-3 p-4 border-b">
        <div className="flex-grow">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
            <Input
              type="text"
              placeholder="Search by Alias/Code..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 bg-gray-100 border-0 focus-visible:ring-2"
            />
          </div>
        </div>
        <div className="flex gap-3 flex-wrap">
          <Button variant="secondary" className="h-12 gap-2">
            Age Group
            <ChevronDown className="h-4 w-4" />
          </Button>
          <Button variant="secondary" className="h-12 gap-2">
            Risk Level
            <ChevronDown className="h-4 w-4" />
          </Button>
          <Button variant="secondary" className="h-12 gap-2">
            Tags
            <ChevronDown className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Grid Content */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-white rounded-xl border p-4 space-y-4">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-10 w-full" />
            </div>
          ))}
        </div>
      ) : filteredClients.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center p-12 mt-8 mx-4 border-2 border-dashed border-gray-300 rounded-xl">
          <div className="w-32 h-32 mb-6 text-gray-300">
            <FileText className="w-full h-full" />
          </div>
          <h3 className="text-xl font-bold text-gray-800">
            {searchQuery
              ? `No clients found matching "${searchQuery}"`
              : "Your Client List is Empty"}
          </h3>
          <p className="mt-2 max-w-sm text-gray-500">
            {searchQuery
              ? "Try adjusting your search terms"
              : "Add your first client to get started. All information is secure and confidential."}
          </p>
          {!searchQuery && therapistId && (
            <CreateClientModal
              therapistId={therapistId}
              trigger={
                <Button className="mt-6 gap-2">
                  <Plus className="h-4 w-4" />
                  Create Your First Client
                </Button>
              }
            />
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
          {filteredClients.map((client) => {
            const ageGroupLabel =
              AGE_GROUPS.find((g) => g.value === client.ageGroup)?.label ||
              client.ageGroup;

            // Get risk level styling
            const riskLevelConfig = client.riskLevel
              ? {
                  low: {
                    bg: "bg-green-100",
                    text: "text-green-800",
                    label: "Low Risk",
                  },
                  medium: {
                    bg: "bg-yellow-100",
                    text: "text-yellow-800",
                    label: "Medium Risk",
                  },
                  high: {
                    bg: "bg-red-100",
                    text: "text-red-800",
                    label: "High Risk",
                  },
                }[client.riskLevel]
              : null;

            return (
              <div
                key={client.id}
                className="flex flex-col gap-4 p-4 bg-white rounded-xl border hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex flex-col">
                  <h3 className="text-lg font-bold">{client.alias}</h3>
                  <p className="text-sm text-gray-500">{ageGroupLabel}</p>
                </div>

                {/* Risk Level */}
                {riskLevelConfig && (
                  <div className="flex flex-col gap-2">
                    <p className="text-xs font-semibold text-gray-500 uppercase">
                      Risk Level
                    </p>
                    <span
                      className={`text-sm font-medium ${riskLevelConfig.text} ${riskLevelConfig.bg} py-1 px-3 rounded-full self-start`}
                    >
                      {riskLevelConfig.label}
                    </span>
                  </div>
                )}

                {/* Tags */}
                {client.tags && client.tags.length > 0 && (
                  <div className="flex flex-col gap-2">
                    <p className="text-xs font-semibold text-gray-500 uppercase">
                      Tags
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {client.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-sm font-medium text-gray-700 bg-gray-100 py-1 px-3 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <Button
                  onClick={() => handleViewDetails(client.id)}
                  variant="ghost"
                  className="mt-2 w-full bg-primary/10 text-primary hover:bg-primary/20 font-bold"
                >
                  View Details
                </Button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
