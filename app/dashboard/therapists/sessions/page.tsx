"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { UploadSessionModal } from "@/modules/session/components/UploadSessionModal";
import { useClients } from "@/modules/client/hooks/useClients";
import { useAuth } from "@/hooks/useAuth";

export default function TherapistSessionsPage() {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const { getUserId } = useAuth();
  const [therapistId, setTherapistId] = useState<string | null>(null);

  useEffect(() => {
    setTherapistId(getUserId());
  }, [getUserId]);

  // Fetch clients for the dropdown
  const { data: clientsResponse } = useClients({
    therapistId: therapistId || "",
    page: 1,
    limit: 100, // Fetch all clients for dropdown
  });

  const clients = clientsResponse?.data || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Sessions</h1>
        <Button onClick={() => setIsUploadModalOpen(true)}>
          Upload Session
        </Button>
      </div>

      <div className="flex gap-4 mb-6">
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md">
          All
        </button>
        <button className="px-4 py-2 border rounded-md hover:bg-gray-50">
          Completed
        </button>
        <button className="px-4 py-2 border rounded-md hover:bg-gray-50">
          Scheduled
        </button>
        <button className="px-4 py-2 border rounded-md hover:bg-gray-50">
          Cancelled
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-semibold">
                    Session with Client {i}
                  </h3>
                  <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                    Completed
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  December {i}, 2025 • 60 minutes
                </p>
                <p className="text-sm text-green-600 mt-1">
                  ✓ Transcription available
                </p>
              </div>
              <Button
                variant="outline"
                onClick={() =>
                  (window.location.href = `/dashboard/therapists/sessions/${i}`)
                }
              >
                View Details
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Upload Session Modal */}
      <UploadSessionModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        clients={clients}
      />
    </div>
  );
}
