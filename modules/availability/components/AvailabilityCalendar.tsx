'use client';

import { Availability } from '../models/Availability';

interface AvailabilityCalendarProps {
  availability: Availability[];
  onSlotSelect?: (slot: Availability) => void;
}

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export function AvailabilityCalendar({
  availability,
  onSlotSelect,
}: AvailabilityCalendarProps) {
  const groupedByDay = availability.reduce((acc, slot) => {
    if (!acc[slot.dayOfWeek]) {
      acc[slot.dayOfWeek] = [];
    }
    acc[slot.dayOfWeek].push(slot);
    return acc;
  }, {} as Record<number, Availability[]>);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Weekly Availability</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {DAYS.map((day, index) => (
          <div key={day} className="border rounded-lg p-4">
            <h4 className="font-semibold mb-2">{day}</h4>
            <div className="space-y-2">
              {groupedByDay[index]?.length > 0 ? (
                groupedByDay[index].map((slot) => (
                  <button
                    key={slot.id}
                    onClick={() => onSlotSelect?.(slot)}
                    className="w-full text-left px-3 py-2 bg-blue-50 hover:bg-blue-100 rounded text-sm transition-colors"
                  >
                    {slot.startTime} - {slot.endTime}
                  </button>
                ))
              ) : (
                <p className="text-sm text-gray-500">Not available</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
