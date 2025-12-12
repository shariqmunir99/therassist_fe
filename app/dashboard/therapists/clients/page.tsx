"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { CreateClientModal } from "@/modules/client/components/CreateClientModal";
import { useClients } from "@/modules/client/hooks/useClients";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { getUserId } from "@/hooks/useAuth";
import { Search, ChevronDown, Plus, FileText, X } from "lucide-react";
import {
  AGE_GROUPS,
  RISK_LEVELS,
  AgeGroup,
  RiskLevel,
} from "@/modules/client/models/Client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

export default function TherapistClientsPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [therapistId, setTherapistId] = useState<string>("");
  const [selectedAgeGroups, setSelectedAgeGroups] = useState<AgeGroup[]>([]);
  const [selectedRiskLevels, setSelectedRiskLevels] = useState<RiskLevel[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  useEffect(() => {
    const id = getUserId();
    if (id) {
      setTherapistId(id);
    }
  }, []);

  const { data, isLoading, error } = useClients({
    therapistId,
  });

  // Extract all unique tags from clients
  const allTags = useMemo(() => {
    if (!data?.data) return [];
    const tagsSet = new Set<string>();
    data.data.forEach((client) => {
      client.tags?.forEach((tag) => tagsSet.add(tag));
    });
    return Array.from(tagsSet).sort();
  }, [data]);

  // Apply all filters
  const filteredClients = useMemo(() => {
    if (!data?.data) return [];

    return data.data.filter((client) => {
      // Search filter
      const matchesSearch = client.alias
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      if (!matchesSearch) return false;

      // Age group filter
      const matchesAgeGroup =
        selectedAgeGroups.length === 0 ||
        selectedAgeGroups.includes(client.ageGroup);
      if (!matchesAgeGroup) return false;

      // Risk level filter
      const matchesRiskLevel =
        selectedRiskLevels.length === 0 ||
        (client.riskLevel && selectedRiskLevels.includes(client.riskLevel));
      if (!matchesRiskLevel) return false;

      // Tags filter
      const matchesTags =
        selectedTags.length === 0 ||
        (client.tags && selectedTags.some((tag) => client.tags?.includes(tag)));
      if (!matchesTags) return false;

      return true;
    });
  }, [data, searchQuery, selectedAgeGroups, selectedRiskLevels, selectedTags]);

  const toggleAgeGroup = (ageGroup: AgeGroup) => {
    setSelectedAgeGroups((prev) =>
      prev.includes(ageGroup)
        ? prev.filter((g) => g !== ageGroup)
        : [...prev, ageGroup]
    );
  };

  const toggleRiskLevel = (riskLevel: RiskLevel) => {
    setSelectedRiskLevels((prev) =>
      prev.includes(riskLevel)
        ? prev.filter((r) => r !== riskLevel)
        : [...prev, riskLevel]
    );
  };

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const clearAllFilters = () => {
    setSelectedAgeGroups([]);
    setSelectedRiskLevels([]);
    setSelectedTags([]);
    setSearchQuery("");
  };

  const hasActiveFilters =
    selectedAgeGroups.length > 0 ||
    selectedRiskLevels.length > 0 ||
    selectedTags.length > 0 ||
    searchQuery.length > 0;

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
          {/* Age Group Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" className="h-12 gap-2 relative">
                Age Group
                {selectedAgeGroups.length > 0 && (
                  <span className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-white">
                    {selectedAgeGroups.length}
                  </span>
                )}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {AGE_GROUPS.map((group) => (
                <DropdownMenuCheckboxItem
                  key={group.value}
                  checked={selectedAgeGroups.includes(group.value)}
                  onCheckedChange={() => toggleAgeGroup(group.value)}
                >
                  {group.label}
                </DropdownMenuCheckboxItem>
              ))}
              {selectedAgeGroups.length > 0 && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem
                    onSelect={() => setSelectedAgeGroups([])}
                    className="text-red-600"
                  >
                    Clear selection
                  </DropdownMenuCheckboxItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Risk Level Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" className="h-12 gap-2 relative">
                Risk Level
                {selectedRiskLevels.length > 0 && (
                  <span className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-white">
                    {selectedRiskLevels.length}
                  </span>
                )}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {RISK_LEVELS.map((level) => (
                <DropdownMenuCheckboxItem
                  key={level.value}
                  checked={selectedRiskLevels.includes(level.value)}
                  onCheckedChange={() => toggleRiskLevel(level.value)}
                >
                  {level.label}
                </DropdownMenuCheckboxItem>
              ))}
              {selectedRiskLevels.length > 0 && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem
                    onSelect={() => setSelectedRiskLevels([])}
                    className="text-red-600"
                  >
                    Clear selection
                  </DropdownMenuCheckboxItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Tags Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="secondary"
                className="h-12 gap-2 relative"
                disabled={allTags.length === 0}
              >
                Tags
                {selectedTags.length > 0 && (
                  <span className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-white">
                    {selectedTags.length}
                  </span>
                )}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-56 max-h-80 overflow-y-auto"
            >
              {allTags.length === 0 ? (
                <div className="px-2 py-3 text-sm text-gray-500">
                  No tags available
                </div>
              ) : (
                <>
                  {allTags.map((tag) => (
                    <DropdownMenuCheckboxItem
                      key={tag}
                      checked={selectedTags.includes(tag)}
                      onCheckedChange={() => toggleTag(tag)}
                    >
                      {tag}
                    </DropdownMenuCheckboxItem>
                  ))}
                  {selectedTags.length > 0 && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuCheckboxItem
                        onSelect={() => setSelectedTags([])}
                        className="text-red-600"
                      >
                        Clear selection
                      </DropdownMenuCheckboxItem>
                    </>
                  )}
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Clear All Filters Button */}
          {hasActiveFilters && (
            <Button
              variant="ghost"
              onClick={clearAllFilters}
              className="h-12 gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <X className="h-4 w-4" />
              Clear All
            </Button>
          )}
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
            {searchQuery || hasActiveFilters
              ? `No clients found`
              : "Your Client List is Empty"}
          </h3>
          <p className="mt-2 max-w-sm text-gray-500">
            {searchQuery || hasActiveFilters
              ? "Try adjusting your search terms or filters"
              : "Add your first client to get started. All information is secure and confidential."}
          </p>
          {!(searchQuery || hasActiveFilters) && therapistId && (
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
                className="flex flex-col gap-4 p-4 cursor-pointer bg-white rounded-xl border hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                onClick={() => handleViewDetails(client.id)}
              >
                <div className="flex flex-col">
                  <h3 className="text-lg font-bold">{client.alias}</h3>
                  <p className="text-sm text-gray-500">{ageGroupLabel}</p>
                </div>

                {/* Risk Level */}
                <div className="flex flex-col gap-2">
                  <p className="text-xs font-semibold text-gray-500 uppercase">
                    Risk Level
                  </p>
                  {riskLevelConfig ? (
                    <span
                      className={`text-sm font-medium ${riskLevelConfig.text} ${riskLevelConfig.bg} py-1 px-3 rounded-full self-start`}
                    >
                      {riskLevelConfig.label}
                    </span>
                  ) : (
                    <p className="text-sm text-gray-400 italic">
                      No information available
                    </p>
                  )}
                </div>

                {/* Tags */}
                <div className="flex flex-col gap-2">
                  <p className="text-xs font-semibold text-gray-500 uppercase">
                    Tags
                  </p>
                  {client.tags && client.tags.length > 0 ? (
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
                  ) : (
                    <p className="text-sm text-gray-400 italic mb-4">
                      No information available
                    </p>
                  )}
                </div>

                <Button
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
