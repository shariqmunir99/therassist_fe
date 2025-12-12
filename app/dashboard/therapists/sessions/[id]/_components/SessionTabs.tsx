"use client";

interface SessionTabsProps {
  activeTab: "insights" | "transcription";
  onTabChange: (tab: "insights" | "transcription") => void;
}

export function SessionTabs({ activeTab, onTabChange }: SessionTabsProps) {
  return (
    <div className="flex flex-col">
      <div className="flex gap-8 border-b border-[#dbdee6]">
        <button
          onClick={() => onTabChange("insights")}
          className={`flex flex-col items-center justify-center border-b-[3px] pb-[13px] pt-4 ${
            activeTab === "insights"
              ? "border-b-[#2463eb]"
              : "border-b-transparent"
          }`}
        >
          <p
            className={`text-sm font-bold leading-normal tracking-[0.015em] ${
              activeTab === "insights" ? "text-[#2463eb]" : "text-[#616e89]"
            }`}
          >
            Insights
          </p>
        </button>
        <button
          onClick={() => onTabChange("transcription")}
          className={`flex flex-col items-center justify-center border-b-[3px] pb-[13px] pt-4 ${
            activeTab === "transcription"
              ? "border-b-[#2463eb]"
              : "border-b-transparent"
          }`}
        >
          <p
            className={`text-sm font-bold leading-normal tracking-[0.015em] ${
              activeTab === "transcription"
                ? "text-[#2463eb]"
                : "text-[#616e89]"
            }`}
          >
            Transcription
          </p>
        </button>
      </div>
    </div>
  );
}
