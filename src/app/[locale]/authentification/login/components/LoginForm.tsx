'use client';

import { useLoginForm } from '@/utils/hooks/useAuth';

import { loginAction } from '../action';

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useLoginForm();

  const onSubmit = async (data: { email: string; password: string }) => {
    const formData = new FormData();
    formData.append('email', data.email);
    formData.append('password', data.password);
    await loginAction(formData);
  };

  return (
    <form onSubmit={() => handleSubmit(onSubmit)}>
      <input type="email" placeholder="Email" autoComplete="new-email" {...register('email')} />
      {errors.email && <p>{errors.email.message}</p>}

      <input
        type="password"
        placeholder="Password"
        autoComplete="new-password"
        {...register('password')}
      />
      {errors.password && <p>{errors.password.message}</p>}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}
