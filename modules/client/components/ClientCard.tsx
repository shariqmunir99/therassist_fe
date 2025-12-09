'use client';

import { Client } from '../models/Client';
import { Button } from '@/modules/shared/components/ui/Button';

interface ClientCardProps {
  client: Client;
  onViewDetails?: (id: string) => void;
}

export function ClientCard({ client, onViewDetails }: ClientCardProps) {
  return (
    <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
          {client.avatarUrl ? (
            <img
              src={client.avatarUrl}
              alt={client.name}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <span className="text-lg font-semibold text-gray-600">
              {client.name.charAt(0)}
            </span>
          )}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold">{client.name}</h3>
          <p className="text-sm text-gray-600">{client.email}</p>
          {client.phone && (
            <p className="text-sm text-gray-500">{client.phone}</p>
          )}
        </div>
        <Button
          onClick={() => onViewDetails?.(client.id)}
          variant="outline"
          size="sm"
        >
          View
        </Button>
      </div>
    </div>
  );
}
