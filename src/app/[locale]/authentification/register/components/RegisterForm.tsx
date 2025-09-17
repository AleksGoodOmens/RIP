'use client';

import { useTranslations } from 'next-intl';

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

  const t = useTranslations();
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

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-1">
        <InputField
          label={t('email.label')}
          type="email"
          placeholder={t('email.placeholder')}
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
        label={t('password.label')}
        placeholder={t('password.placeholder')}
        error={errors.password?.message}
        register={register('password')}
      />

      <PasswordField
        label={t('confirmPassword.label')}
        placeholder={t('confirmPassword.placeholder')}
        error={errors.confirmPassword?.message}
        register={register('confirmPassword')}
      />

      <Button
        variant="outline"
        type="submit"
        className="w-full"
        disabled={isSubmitting || !isValid}
      >
        {isSubmitting ? t('button.processing') : t('button.submit')}
      </Button>
    </form>
  );
}
