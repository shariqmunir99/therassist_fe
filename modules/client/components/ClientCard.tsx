"use client";

import { Client, AGE_GROUPS } from "../models/Client";
import { Button } from "@/components/ui/button";

interface ClientCardProps {
  client: Client;
  onViewDetails?: (id: string) => void;
}

export function ClientCard({ client, onViewDetails }: ClientCardProps) {
  const ageGroupLabel =
    AGE_GROUPS.find((g) => g.value === client.ageGroup)?.label ||
    client.ageGroup;

  return (
    <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow bg-white">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
          <span className="text-lg font-semibold text-white">
            {client.alias.charAt(0).toUpperCase()}
          </span>
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-lg">{client.alias}</h3>
          <p className="text-sm text-gray-600">{ageGroupLabel}</p>
        </div>
        <Button
          onClick={() => onViewDetails?.(client.id)}
          variant="outline"
          size="sm"
        >
          View Details
        </Button>
      </div>
    </div>
  );
}
