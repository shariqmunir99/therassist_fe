interface StatsCardProps {
  title: string;
  value: number;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  icon?: string;
}

export function StatsCard({ title, value, trend }: StatsCardProps) {
  return (
    <div className="flex flex-col gap-2 rounded-lg bg-white border border-slate-200 p-6 shadow-sm">
      <p className="text-slate-800 text-base font-medium">{title}</p>
      <p className="text-slate-800 tracking-tight text-4xl font-bold">
        {value}
      </p>
      {trend && (
        <p className="text-blue-600 text-sm font-medium flex items-center gap-1">
          <span className="text-base">↑</span>
          <span>{trend.value}</span>
        </p>
      )}
    </div>
  );
}
