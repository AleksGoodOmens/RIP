'use client';

import { InputField, PasswordField } from '@/components';
import { Button } from '@/components/ui';
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-1">
        <InputField
          label="Email"
          type="email"
          placeholder="Email"
          autoComplete="new-email"
          error={errors.email?.message}
          {...register('email')}
        />
        {errors.email && (
          <p role="alert" className="text-destructive text-sm">
            {errors.email.message}
          </p>
        )}
      </div>

      <PasswordField
        label="Password"
        placeholder="Password"
        error={errors.password?.message}
        register={register('password')}
      />

      <PasswordField
        label="Confirm Password"
        placeholder="Confirm Password"
        error={errors.confirmPassword?.message}
        register={register('confirmPassword')}
      />

      <Button
        variant="outline"
        type="submit"
        className="w-full"
        disabled={isSubmitting || !isValid}
      >
        {isSubmitting ? 'Processing...' : 'Register'}
      </Button>
    </form>
  );
}
