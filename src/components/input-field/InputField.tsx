'use client';
// components/ui/input-field.tsx

import { Eye, EyeOff } from 'lucide-react';
import { forwardRef, InputHTMLAttributes, useState } from 'react';

import { Input, Label } from '@/components/ui';
import { cn } from '@/lib/utils';

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helperText?: string;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ className, label, error, helperText, id, type = 'text', ...props }, ref) => {
    const inputId = id || `input-${Math.random().toString(36)}`;

    const [localType, setLocalType] = useState(type);

    return (
      <div className="flex flex-wrap items-center gap-2 relative">
        <Label
          htmlFor={inputId}
          className={cn('font-bold capitalize px-2', error && 'text-destructive')}
        >
          {label}
        </Label>
        <Input
          id={inputId}
          className={cn(error && 'border-destructive focus:ring-destructive', className)}
          ref={ref}
          type={localType}
          {...props}
        />
        {type === 'password' && (
          <button
            className="absolute right-4 bottom-2 cursor-pointer"
            onClick={() => setLocalType((prev) => (prev === 'password' ? 'text' : 'password'))}
          >
            {localType === 'password' ? <Eye /> : <EyeOff />}
          </button>
        )}
        {error ? (
          <p className="px-4 text-sm text-destructive basis-full">{error}</p>
        ) : helperText ? (
          <p className="px-4 text-sm text-muted-foreground basis-full">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

InputField.displayName = 'InputField';

export { InputField };
