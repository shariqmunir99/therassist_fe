'use client';

import { useState } from 'react';
import { TherapistFormData } from '../models/Therapist';
import { Button } from '@/modules/shared/components/ui/Button';

interface TherapistProfileFormProps {
  initialData?: Partial<TherapistFormData>;
  onSubmit: (data: TherapistFormData) => void;
  isLoading?: boolean;
}

export function TherapistProfileForm({
  initialData,
  onSubmit,
  isLoading,
}: TherapistProfileFormProps) {
  const [formData, setFormData] = useState<TherapistFormData>({
    name: initialData?.name || '',
    bio: initialData?.bio || '',
    specializations: initialData?.specializations || [],
    credentials: initialData?.credentials || [],
    hourlyRate: initialData?.hourlyRate || 0,
    phone: initialData?.phone || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2">Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-3 py-2 border rounded-md"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Phone</label>
        <input
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Bio</label>
        <textarea
          value={formData.bio}
          onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
          className="w-full px-3 py-2 border rounded-md"
          rows={4}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Hourly Rate ($)</label>
        <input
          type="number"
          value={formData.hourlyRate}
          onChange={(e) =>
            setFormData({ ...formData, hourlyRate: parseFloat(e.target.value) })
          }
          className="w-full px-3 py-2 border rounded-md"
          min="0"
          step="0.01"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Specializations (comma-separated)
        </label>
        <input
          type="text"
          value={formData.specializations.join(', ')}
          onChange={(e) =>
            setFormData({
              ...formData,
              specializations: e.target.value.split(',').map((s) => s.trim()),
            })
          }
          className="w-full px-3 py-2 border rounded-md"
          placeholder="e.g., Anxiety, Depression, Trauma"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Credentials (comma-separated)
        </label>
        <input
          type="text"
          value={formData.credentials.join(', ')}
          onChange={(e) =>
            setFormData({
              ...formData,
              credentials: e.target.value.split(',').map((s) => s.trim()),
            })
          }
          className="w-full px-3 py-2 border rounded-md"
          placeholder="e.g., PhD, LMFT, Licensed Psychologist"
        />
      </div>

      <Button type="submit" disabled={isLoading}>
        {isLoading ? 'Saving...' : 'Save Profile'}
      </Button>
    </form>
  );
}
