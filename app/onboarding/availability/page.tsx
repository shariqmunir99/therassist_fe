"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface TimeSlot {
  day: number;
  hour: number;
  available: boolean;
}

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const HOURS = Array.from({ length: 12 }, (_, i) => i + 8); // 8:00 to 19:00

export default function AvailabilityPage() {
  const router = useRouter();
  const [timezone, setTimezone] = useState("Pacific Time (US & Canada)");
  const [availability, setAvailability] = useState<TimeSlot[]>(() => {
    // Initialize with 9-5 weekdays
    const initial: TimeSlot[] = [];
    for (let day = 0; day < 5; day++) {
      for (let hour = 9; hour <= 16; hour++) {
        initial.push({ day, hour, available: true });
      }
    }
    return initial;
  });

  const isSlotAvailable = (day: number, hour: number) => {
    return availability.some(
      (slot) => slot.day === day && slot.hour === hour && slot.available
    );
  };

  const toggleSlot = (day: number, hour: number) => {
    const existingIndex = availability.findIndex(
      (slot) => slot.day === day && slot.hour === hour
    );

    if (existingIndex >= 0) {
      // Toggle or remove
      const newAvailability = [...availability];
      if (newAvailability[existingIndex].available) {
        newAvailability[existingIndex].available = false;
        setAvailability(newAvailability.filter((slot) => slot.available));
      } else {
        newAvailability[existingIndex].available = true;
        setAvailability(newAvailability);
      }
    } else {
      // Add new slot
      setAvailability([...availability, { day, hour, available: true }]);
    }
  };

  const copyMondayToAll = () => {
    const mondaySlots = availability.filter((slot) => slot.day === 0);
    const newSlots: TimeSlot[] = [];
    for (let day = 0; day < 7; day++) {
      mondaySlots.forEach((slot) => {
        newSlots.push({ day, hour: slot.hour, available: true });
      });
    }
    setAvailability(newSlots);
  };

  const resetTo9To5 = () => {
    const slots: TimeSlot[] = [];
    for (let day = 0; day < 5; day++) {
      for (let hour = 9; hour <= 16; hour++) {
        slots.push({ day, hour, available: true });
      }
    }
    setAvailability(slots);
  };

  const handleSubmit = async () => {
    // TODO: Save data to state management or context
    // TODO: Submit all onboarding data to API
    console.log("Availability:", availability);
    router.push("/dashboard");
  };

  return (
    <div className="relative min-h-screen w-full bg-white overflow-x-hidden">
      <div className="flex-1 flex flex-col items-center py-8 px-4 sm:px-8">
        <div className="flex flex-col max-w-[1100px] w-full flex-1 gap-8">
          {/* Progress Section */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-end">
                <p className="text-blue-600 text-sm font-bold uppercase tracking-wider">
                  STEP 4 OF 4
                </p>
                <span className="text-slate-500 text-xs">85% Completed</span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-slate-200 overflow-hidden">
                <div
                  className="h-full bg-blue-600 rounded-full transition-all duration-500"
                  style={{ width: "85%" }}
                />
              </div>
            </div>

            {/* Header */}
            <div className="flex flex-wrap justify-between items-end gap-4">
              <div className="flex flex-col gap-2 max-w-2xl">
                <h1 className="text-slate-900 text-4xl md:text-5xl font-extrabold leading-tight tracking-[-0.02em]">
                  When are you free?
                </h1>
                <p className="text-slate-500 text-lg font-normal leading-normal">
                  Define your standard weekly availability. You can override
                  specific dates later.
                </p>
              </div>
              <div className="flex items-center gap-2 bg-slate-50 rounded-full px-4 py-2 border border-slate-200">
                <span className="material-symbols-outlined text-slate-500 text-[20px]">
                  public
                </span>
                <select
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                  className="bg-transparent border-none text-sm text-slate-900 focus:ring-0 p-0 pr-8 cursor-pointer font-medium"
                >
                  <option>Pacific Time (US & Canada)</option>
                  <option>Eastern Time (US & Canada)</option>
                  <option>London (GMT)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex flex-col lg:flex-row gap-6 mt-4">
            {/* Sidebar */}
            <div className="lg:w-64 flex flex-col gap-4 shrink-0">
              {/* Quick Actions */}
              <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 flex flex-col gap-4">
                <p className="text-slate-900 font-bold text-sm">
                  Quick Actions
                </p>
                <button
                  onClick={copyMondayToAll}
                  className="flex w-full cursor-pointer items-center justify-between rounded-lg h-10 px-3 bg-blue-100 hover:bg-blue-200 text-blue-600 text-sm font-medium transition-colors group"
                >
                  <span className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-blue-600 group-hover:scale-110 transition-transform text-[18px]">
                      content_copy
                    </span>
                    Copy Mon to All
                  </span>
                </button>
                <button
                  onClick={resetTo9To5}
                  className="flex w-full cursor-pointer items-center justify-between rounded-lg h-10 px-3 bg-transparent hover:bg-slate-50 border border-slate-200 text-slate-500 hover:text-slate-900 text-sm font-medium transition-colors group"
                >
                  <span className="flex items-center gap-2">
                    <span className="material-symbols-outlined transition-colors text-[18px]">
                      restart_alt
                    </span>
                    Reset to 9-5
                  </span>
                </button>
              </div>

              {/* Legend */}
              <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 flex flex-col gap-3">
                <p className="text-slate-900 font-bold text-sm">Legend</p>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded bg-blue-600"></div>
                  <span className="text-slate-500 text-sm">Available</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded bg-slate-100 border border-slate-200"></div>
                  <span className="text-slate-500 text-sm">Unavailable</span>
                </div>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="flex-1 bg-slate-50 rounded-2xl border border-slate-200 p-4 md:p-6 overflow-x-auto relative shadow-sm">
              <div className="absolute top-1/2 left-1/2 w-3/4 h-3/4 -translate-x-1/2 -translate-y-1/2 bg-blue-600/5 blur-3xl pointer-events-none rounded-full" />

              <div className="min-w-[700px] relative z-10">
                {/* Header Row */}
                <div className="grid grid-cols-8 gap-2 mb-4">
                  <div className="text-transparent text-xs font-bold uppercase text-center py-2">
                    Time
                  </div>
                  {DAYS.map((day, idx) => (
                    <div
                      key={day}
                      className={`text-xs font-bold uppercase text-center py-2 ${
                        idx >= 5 ? "text-slate-400" : "text-slate-500"
                      }`}
                    >
                      {day}
                    </div>
                  ))}
                </div>

                {/* Time Grid */}
                <div className="h-[400px] overflow-y-auto pr-2 no-scrollbar">
                  <div className="grid grid-cols-8 gap-2">
                    {/* Time Labels Column */}
                    <div className="flex flex-col gap-2">
                      {HOURS.map((hour) => (
                        <div
                          key={hour}
                          className="h-10 flex items-center justify-end pr-2 text-xs text-slate-500 font-medium"
                        >
                          {hour.toString().padStart(2, "0")}:00
                        </div>
                      ))}
                    </div>

                    {/* Day Columns */}
                    {DAYS.map((day, dayIndex) => (
                      <div
                        key={day}
                        className={`flex flex-col gap-2 ${
                          dayIndex >= 5 ? "opacity-50" : ""
                        }`}
                      >
                        {HOURS.map((hour) => {
                          const available = isSlotAvailable(dayIndex, hour);
                          return (
                            <button
                              key={`${day}-${hour}`}
                              onClick={() => toggleSlot(dayIndex, hour)}
                              className={`h-10 rounded cursor-pointer transition-all ${
                                available
                                  ? "bg-blue-600/90 border-x border-blue-600 hover:bg-blue-700"
                                  : "bg-slate-100 border border-slate-200 hover:bg-slate-200"
                              }`}
                            />
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col-reverse sm:flex-row justify-between items-center gap-4 mt-8 pb-8 border-t border-slate-200 pt-8">
            <button
              onClick={() => router.push("/onboarding/licenses-info")}
              className="w-full sm:w-auto text-slate-500 hover:text-slate-900 font-bold text-sm py-3 px-6 rounded-full hover:bg-slate-50 transition-colors"
            >
              Back
            </button>
            <button
              onClick={handleSubmit}
              className="w-full sm:w-auto shadow-[0_8px_20px_rgba(37,99,235,0.2)] flex min-w-[140px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-12 px-6 bg-blue-600 hover:bg-blue-700 text-white text-base font-extrabold leading-normal tracking-wide transition-all transform hover:scale-105"
            >
              <span className="truncate">Finish Setup</span>
              <span className="material-symbols-outlined ml-2 text-[20px]">
                check_circle
              </span>
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
