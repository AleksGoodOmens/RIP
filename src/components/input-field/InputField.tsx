'use client';

import { forwardRef, InputHTMLAttributes, ReactElement, ReactNode } from 'react';

import { Input, Label } from '@/components/ui';
import { cn } from '@/lib/utils';

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helperText?: string;
  children?: ReactElement;
  rightIcon?: ReactNode;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ className, label, error, helperText, name, children, rightIcon, ...props }, ref) => {
    return (
      <div className="space-y-1">
        <Label
          htmlFor={name}
          className={cn('font-bold capitalize px-2', error && 'text-destructive')}
        >
          {label}
        </Label>

        <div className="relative">
          <Input
            className={cn('pr-10', error && 'border-destructive focus:ring-destructive', className)}
            ref={ref}
            id={name}
            name={name}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
              {rightIcon}
            </div>
          )}
        </div>

        {children}
        {error && <p className="px-4 text-sm text-destructive">{error}</p>}
        {helperText && <p className="px-4 text-sm text-muted-foreground">{helperText}</p>}
      </div>
    );
  }
);

InputField.displayName = 'InputField';

export { InputField };
