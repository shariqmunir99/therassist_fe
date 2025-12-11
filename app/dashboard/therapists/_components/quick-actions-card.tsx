"use client";

interface QuickAction {
  id: string;
  label: string;
  icon: string;
  href?: string;
}

interface QuickActionsCardProps {
  actions: QuickAction[];
}

export function QuickActionsCard({ actions }: QuickActionsCardProps) {
  return (
    <div className="bg-white border border-slate-200 p-6 rounded-lg shadow-sm">
      <h2 className="text-slate-800 text-lg font-bold mb-4">Quick Actions</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {actions.map((action) => (
          <button
            key={action.id}
            onClick={() => {
              if (action.href) {
                window.location.href = action.href;
              }
            }}
            className="flex flex-col items-center justify-center gap-2 p-4 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors duration-200"
          >
            <span className="text-3xl text-blue-600">{action.icon}</span>
            <span className="font-semibold text-sm text-slate-800">
              {action.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
