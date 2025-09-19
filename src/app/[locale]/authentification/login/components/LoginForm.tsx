'use client';

import { useTranslations } from 'next-intl';
import { toast } from 'react-toastify';

import { InputField, PasswordField } from '@/components';
import { Button } from '@/components/ui';
import { useLoginForm } from '@/utils/hooks/useAuth';

import { loginAction } from '../action';

export default function LoginForm() {
  const t = useTranslations();
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

    const result = await loginAction(formData, t('toasts.successLogin'));

    if (!result.success) {
      Object.entries(result.fieldErrors).forEach(([field, message]) => {
        setError(field as keyof typeof data, { message });
      });
      toast.error(t('toasts.failLogin'), {
        toastId: 'fail_login',
      });
      return;
    }
    toast.success(t('toasts.successLogin'), {
      toastId: 'success_login',
    });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <InputField
        label={t('email.label')}
        type="email"
        placeholder={t('email.placeholder')}
        autoComplete="new-email"
        {...register('email')}
      />
      {errors.email && (
        <p role="alert" className="text-destructive text-sm">
          {errors.email.message}
        </p>
      )}

      <PasswordField
        label={t('password.label')}
        placeholder={t('password.placeholder')}
        autoComplete="new-password"
        error={errors.password?.message}
        register={register('password')}
      />

      <Button variant="outline" type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? t('button.processing') : t('button.enter')}
      </Button>
    </form>
  );
}
