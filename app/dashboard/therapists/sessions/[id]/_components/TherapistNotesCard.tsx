"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface TherapistNotesCardProps {
  notes: string;
  onSave?: (notes: string) => void;
}

export function TherapistNotesCard({
  notes: initialNotes,
  onSave,
}: TherapistNotesCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [notes, setNotes] = useState(initialNotes);

  const handleSave = () => {
    if (onSave) {
      onSave(notes);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setNotes(initialNotes);
    setIsEditing(false);
  };

  return (
    <Card className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between p-0 mb-2">
        <CardTitle className="text-lg font-bold text-[#111318]">
          Therapist Notes
        </CardTitle>
        {!isEditing && (
          <Button
            onClick={() => setIsEditing(true)}
            variant="ghost"
            className="text-[#2463eb] text-sm font-bold hover:underline p-0 h-auto"
          >
            Edit
          </Button>
        )}
      </CardHeader>
      <CardDescription className="text-sm text-[#616e89] mb-4 p-0">
        Private notes and reflections for this session.
      </CardDescription>
      <CardContent className="p-0">
        {isEditing ? (
          <div className="space-y-3">
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="min-h-[150px] rounded-lg bg-[#f6f6f8] text-[#111318] text-sm"
              placeholder="Enter your notes here..."
            />
            <div className="flex gap-2">
              <Button
                onClick={handleSave}
                size="sm"
                className="bg-[#2463eb] hover:bg-[#1d4fd7]"
              >
                Save
              </Button>
              <Button onClick={handleCancel} variant="outline" size="sm">
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div className="min-h-[150px] rounded-lg bg-[#f6f6f8] p-4">
            <p className="text-sm leading-relaxed text-[#111318]">
              {notes || "No notes yet. Click Edit to add notes."}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
