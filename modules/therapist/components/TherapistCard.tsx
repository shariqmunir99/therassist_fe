'use client';

import { Therapist } from '../models/Therapist';
import { Button } from '@/modules/shared/components/ui/Button';

interface TherapistCardProps {
  therapist: Therapist;
  onViewProfile?: (id: string) => void;
}

export function TherapistCard({ therapist, onViewProfile }: TherapistCardProps) {
  return (
    <div className="border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4">
        <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
          {therapist.avatarUrl ? (
            <img
              src={therapist.avatarUrl}
              alt={therapist.name}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <span className="text-2xl font-semibold text-gray-600">
              {therapist.name.charAt(0)}
            </span>
          )}
        </div>
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold">{therapist.name}</h3>
              {therapist.isVerified && (
                <span className="text-xs text-green-600">✓ Verified</span>
              )}
            </div>
            <div className="text-right">
              <p className="text-lg font-bold">${therapist.hourlyRate}/hr</p>
              {therapist.rating && (
                <p className="text-sm text-gray-600">⭐ {therapist.rating}</p>
              )}
            </div>
          </div>
          <div className="mt-2">
            <p className="text-sm text-gray-600 line-clamp-2">{therapist.bio}</p>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {therapist.specializations.map((spec) => (
              <span
                key={spec}
                className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
              >
                {spec}
              </span>
            ))}
          </div>
          <div className="mt-4">
            <Button
              onClick={() => onViewProfile?.(therapist.id)}
              variant="outline"
              size="sm"
            >
              View Profile
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
