'use client';

import { useState } from 'react';

import { useRegisterForm } from '@/utils/hooks/useAuth';
import { usePasswordRequirements } from '@/utils/hooks/usePasswordRequirements';

import { registerAction } from '../actions';

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useRegisterForm();

  const password = watch('password') ?? '';
  const checks = usePasswordRequirements(password);
  const [isFocused, setIsFocused] = useState(false);

  const onSubmit = async (data: { email: string; password: string; confirmPassword: string }) => {
    const formData = new FormData();
    formData.append('email', data.email);
    formData.append('password', data.password);
    formData.append('confirmPassword', data.confirmPassword);

    const result = await registerAction(formData);

    if (!result.success) {
      Object.entries(result.fieldErrors).forEach(([field, message]) => {
        setError(field as keyof typeof data, { message });
      });
      return;
    }

    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="email" placeholder="Email" autoComplete="new-email" {...register('email')} />
      {errors.email && <p>{errors.email.message}</p>}

      <input
        type="password"
        placeholder="Password"
        autoComplete="new-password"
        {...register('password')}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      {errors.password && <p>{errors.password.message}</p>}

      {isFocused && (
        <ul style={{ marginBottom: '1rem' }}>
          {checks.map(({ label, met }) => (
            <li key={label} style={{ color: met ? 'green' : 'red' }}>
              {met ? '✓' : '✗'} {label}
            </li>
          ))}
        </ul>
      )}

      <input
        type="password"
        placeholder="Confirm Password"
        autoComplete="new-password"
        {...register('confirmPassword')}
      />
      {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Processing...' : 'Register'}
      </button>
    </form>
  );
}
