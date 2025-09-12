'use client';

import { InputField } from '@/components';
import { useRegisterForm } from '@/utils/hooks/useAuth';

import { registerAction } from '../actions';

export interface onSubmitProps {
  email: string;
  password: string;
  confirmPassword: string;
}

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting, isValid },
    reset,
  } = useRegisterForm();

  const onSubmit = async (data: onSubmitProps) => {
    const result = await registerAction(data);

    if (!result.success) {
      Object.entries(result.fieldErrors).forEach(([field, message]) => {
        setError(field as keyof typeof data, { message });
      });
      return;
    }

    reset();
  };

  console.log(errors.email?.message);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputField
        label="Email"
        type="email"
        placeholder="Email"
        autoComplete="new-email"
        error={errors.email?.message}
        {...register('email')}
      />

      <InputField
        label="Password"
        type="password"
        placeholder="Password"
        autoComplete="new-password"
        {...register('password')}
        error={errors.password?.message}
      />

      <InputField
        label="Confirm Password"
        type="password"
        placeholder="Confirm Password"
        autoComplete="new-password"
        {...register('confirmPassword')}
        error={errors.confirmPassword?.message}
      />

      <button type="submit" disabled={isSubmitting || !isValid}>
        {isSubmitting ? 'Processing...' : 'Register'}
      </button>
    </form>
  );
}
