'use client';

import { forwardRef } from 'react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface FormInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: string;
  rightIcon?: string;
  onRightIconClick?: () => void;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ leftIcon, rightIcon, onRightIconClick, className, ...props }, ref) => {
    return (
      <div className="flex w-full flex-1 items-stretch rounded-xl border border-gray-200">
        {leftIcon && (
          <div className="text-[#8E8E93] flex bg-white items-center justify-center pl-4 rounded-l-xl">
            <span className="material-symbols-outlined">{leftIcon}</span>
          </div>
        )}
        <Input
          ref={ref}
          className={cn(
            'form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden text-[#1D1D1F] focus:outline-0 focus:ring-0 border-0 bg-white h-14 placeholder:text-[#8E8E93] p-[15px] text-base font-normal leading-normal',
            leftIcon ? 'rounded-l-none' : '',
            rightIcon ? 'rounded-r-none pr-4' : 'pr-4',
            className
          )}
          {...props}
        />
        {rightIcon && (
          <div
            className={cn(
              'text-[#8E8E93] flex bg-white items-center justify-center pr-4 rounded-r-xl',
              onRightIconClick && 'cursor-pointer'
            )}
            onClick={onRightIconClick}
          >
            <span className="material-symbols-outlined">{rightIcon}</span>
          </div>
        )}
      </div>
    );
  }
);

FormInput.displayName = 'FormInput';
