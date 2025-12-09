'use client';

import { Session } from '../models/Session';
import { Button } from '@/modules/shared/components/ui/Button';

interface SessionCardProps {
  session: Session;
  onViewDetails?: (id: string) => void;
}

export function SessionCard({ session, onViewDetails }: SessionCardProps) {
  const statusColors = {
    scheduled: 'bg-blue-100 text-blue-700',
    completed: 'bg-green-100 text-green-700',
    cancelled: 'bg-red-100 text-red-700',
    'no-show': 'bg-gray-100 text-gray-700',
  };

  return (
    <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-semibold">
              {new Date(session.sessionDate).toLocaleDateString()}
            </h3>
            <span
              className={`px-2 py-1 text-xs rounded-full ${
                statusColors[session.status]
              }`}
            >
              {session.status}
            </span>
          </div>
          <p className="text-sm text-gray-600 mt-1">
            Duration: {session.duration} minutes
          </p>
          {session.hasTranscription && (
            <p className="text-xs text-green-600 mt-1">✓ Transcription available</p>
          )}
          {session.notes && (
            <p className="text-sm text-gray-600 mt-2 line-clamp-2">
              {session.notes}
            </p>
          )}
        </div>
        <Button
          onClick={() => onViewDetails?.(session.id)}
          variant="outline"
          size="sm"
        >
          View
        </Button>
      </div>
    </div>
  );
}
