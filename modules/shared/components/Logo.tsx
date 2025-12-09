import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  iconClassName?: string;
}

export function Logo({ className, iconClassName }: LogoProps) {
  return (
    <div
      className={cn(
        'flex items-center justify-center w-16 h-16 bg-[#005A9C] rounded-xl',
        className
      )}
    >
      <span
        className={cn('material-symbols-outlined text-white', iconClassName)}
        style={{ fontSize: '36px' }}
      >
        spa
      </span>
    </div>
  );
}
