'use client';

import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

import { InputField } from '@/components';

interface PasswordFieldProps {
  label: string;
  placeholder?: string;
  autoComplete?: string;
  error?: string;
  register: UseFormRegisterReturn;
}

function PasswordField({
  label,
  placeholder,
  autoComplete = 'new-password',
  error,
  register,
}: PasswordFieldProps) {
  const [visible, setVisible] = useState(false);

  return (
    <InputField
      label={label}
      type={visible ? 'text' : 'password'}
      placeholder={placeholder}
      autoComplete={autoComplete}
      error={error}
      {...register}
      className="pr-10"
      rightIcon={
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? 'Hide password' : 'Show password'}
          className="text-muted-foreground hover:text-foreground"
        >
          {visible ? <Eye size={18} /> : <EyeOff size={18} />}
        </button>
      }
    />
  );
}

export { PasswordField };
