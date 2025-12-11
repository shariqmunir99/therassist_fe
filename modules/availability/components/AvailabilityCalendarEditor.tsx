"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel } from "@/components/ui/field";

interface TimeSlot {
  day: string;
  start_time: string;
  end_time: string;
}

interface AvailabilityCalendarEditorProps {
  slots: TimeSlot[];
  onSlotsChange: (slots: TimeSlot[]) => void;
}

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export function AvailabilityCalendarEditor({
  slots,
  onSlotsChange,
}: AvailabilityCalendarEditorProps) {
  const [selectedDay, setSelectedDay] = useState<string>("");
  const [startTime, setStartTime] = useState<string>("09:00");
  const [endTime, setEndTime] = useState<string>("17:00");

  const addSlot = () => {
    if (!selectedDay) {
      alert("Please select a day");
      return;
    }

    if (startTime >= endTime) {
      alert("End time must be after start time");
      return;
    }

    const newSlot: TimeSlot = {
      day: selectedDay,
      start_time: startTime,
      end_time: endTime,
    };

    onSlotsChange([...slots, newSlot]);
    setSelectedDay("");
    setStartTime("09:00");
    setEndTime("17:00");
  };

  const removeSlot = (index: number) => {
    const newSlots = slots.filter((_, i) => i !== index);
    onSlotsChange(newSlots);
  };

  const groupedSlots = slots.reduce((acc, slot) => {
    if (!acc[slot.day]) {
      acc[slot.day] = [];
    }
    acc[slot.day].push(slot);
    return acc;
  }, {} as Record<string, TimeSlot[]>);

  return (
    <div className="w-full space-y-6">
      <div className="border rounded-lg p-6 space-y-4">
        <h3 className="font-semibold text-lg">Add Availability Slot</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Field>
            <FieldLabel>Day</FieldLabel>
            <select
              value={selectedDay}
              onChange={(e) => setSelectedDay(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <option value="">Select a day</option>
              {DAYS.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
          </Field>

          <Field>
            <FieldLabel>Start Time</FieldLabel>
            <Input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
          </Field>

          <Field>
            <FieldLabel>End Time</FieldLabel>
            <Input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
          </Field>
        </div>

        <Button type="button" onClick={addSlot} className="w-full md:w-auto">
          Add Slot
        </Button>
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Your Availability</h3>

        {slots.length === 0 ? (
          <p className="text-[#8E8E93] text-sm">
            No availability slots added yet. Add your first slot above.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {DAYS.map((day) => (
              <div key={day} className="border rounded-lg p-4">
                <h4 className="font-semibold mb-3">{day}</h4>
                <div className="space-y-2">
                  {groupedSlots[day]?.length > 0 ? (
                    groupedSlots[day].map((slot, idx) => {
                      const globalIndex = slots.findIndex(
                        (s) =>
                          s.day === slot.day &&
                          s.start_time === slot.start_time &&
                          s.end_time === slot.end_time
                      );
                      return (
                        <div
                          key={idx}
                          className="flex items-center justify-between bg-blue-50 rounded px-3 py-2"
                        >
                          <span className="text-sm">
                            {slot.start_time} - {slot.end_time}
                          </span>
                          <button
                            type="button"
                            onClick={() => removeSlot(globalIndex)}
                            className="text-red-600 hover:text-red-800 text-sm font-medium"
                          >
                            Remove
                          </button>
                        </div>
                      );
                    })
                  ) : (
                    <p className="text-sm text-gray-400">Not available</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
