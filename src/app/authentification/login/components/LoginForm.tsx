'use client';

import { doSignInWithEmailAndPassword, doSignInWithGoogle } from '@/firebase/auth';

import { useLoginForm } from '../../../../utils/hooks/useAuth';

interface LoginFormProps {
  onSuccess: () => void;
}

export default function LoginForm({ onSuccess }: LoginFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useLoginForm();

  const onSubmit = async (data: { email: string; password: string }) => {
    try {
      await doSignInWithEmailAndPassword(data);
      reset();
      onSuccess();
    } catch (err) {
      console.error(err);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await doSignInWithGoogle();
      onSuccess();
    } catch (err) {
      console.error(err);
    }
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
        {isSubmitting ? 'Processing...' : 'Enter'}
      </button>

      <button
        type="button"
        onClick={() => {
          void handleGoogleSignIn();
        }}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Signing in...' : 'Sign in with Google'}
      </button>
    </form>
  );
}
