"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface TranscriptionFiltersProps {
  selectedSpeaker: "all" | "client" | "therapist";
  onSpeakerChange: (speaker: "all" | "client" | "therapist") => void;
}

export function TranscriptionFilters({
  selectedSpeaker,
  onSpeakerChange,
}: TranscriptionFiltersProps) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <Label htmlFor="speaker-filter" className="text-sm font-medium">
          Speaker:
        </Label>
        <Select value={selectedSpeaker} onValueChange={onSpeakerChange}>
          <SelectTrigger id="speaker-filter" className="w-[180px]">
            <SelectValue placeholder="Filter by speaker" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="client">Client</SelectItem>
            <SelectItem value="therapist">Therapist</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
