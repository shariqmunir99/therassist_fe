'use client';

import { cn } from '@/lib/utils';

interface UserTypeToggleProps {
  value: 'Therapist' | 'Client';
  onChange: (value: 'Therapist' | 'Client') => void;
  className?: string;
}

export function UserTypeToggle({
  value,
  onChange,
  className,
}: UserTypeToggleProps) {
  return (
    <div className={cn('flex px-4 py-3 w-full max-w-md', className)}>
      <div className="flex h-12 flex-1 items-center justify-center rounded-xl bg-[#E6F0F8] p-1">
        <label
          className={cn(
            'flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-lg px-2 text-sm font-medium leading-normal transition-all duration-200',
            value === 'Therapist'
              ? 'bg-white shadow-[0_1px_3px_rgba(0,0,0,0.1)] text-[#1D1D1F]'
              : 'text-[#8E8E93]'
          )}
        >
          <span className="truncate">Therapist</span>
          <input
            checked={value === 'Therapist'}
            onChange={() => onChange('Therapist')}
            className="invisible w-0"
            name="user_type_toggle"
            type="radio"
            value="Therapist"
          />
        </label>
        <label
          className={cn(
            'flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-lg px-2 text-sm font-medium leading-normal transition-all duration-200',
            value === 'Client'
              ? 'bg-white shadow-[0_1px_3px_rgba(0,0,0,0.1)] text-[#1D1D1F]'
              : 'text-[#8E8E93]'
          )}
        >
          <span className="truncate">Client</span>
          <input
            checked={value === 'Client'}
            onChange={() => onChange('Client')}
            className="invisible w-0"
            name="user_type_toggle"
            type="radio"
            value="Client"
          />
        </label>
      </div>
    </div>
  );
}
