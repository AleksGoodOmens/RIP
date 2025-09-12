'use client';

import { InputField, PasswordField } from '@/components';
import { Button } from '@/components/ui';
import { useLoginForm } from '@/utils/hooks/useAuth';

import { loginAction } from '../action';

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useLoginForm();

  const onSubmit = async (data: { email: string; password: string }) => {
    const formData = new FormData();
    formData.append('email', data.email);
    formData.append('password', data.password);

    const result = await loginAction(formData);

    if (!result.success) {
      Object.entries(result.fieldErrors).forEach(([field, message]) => {
        setError(field as keyof typeof data, { message });
      });
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <InputField
        label="Email"
        type="email"
        placeholder="Email"
        autoComplete="new-email"
        {...register('email')}
      />
      {errors.email && (
        <p role="alert" className="text-destructive text-sm">
          {errors.email.message}
        </p>
      )}

      <PasswordField
        label="Password"
        placeholder="Password"
        autoComplete="new-password"
        error={errors.password?.message}
        register={register('password')}
      />

      <Button variant="outline" type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? 'Logging in...' : 'Login'}
      </Button>
    </form>
  );
}
