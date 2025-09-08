'use client';

import { doCreateUserWithEmailAndPassword, doSignInWithGoogle } from '@/firebase/auth';
import { useRegisterForm } from '@/utils/hooks/useAuth';

interface RegisterFormProps {
  onSuccess: () => void;
}

export default function RegisterForm({ onSuccess }: RegisterFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useRegisterForm();

  const onSubmit = async (data: { email: string; password: string; confirmPassword: string }) => {
    try {
      await doCreateUserWithEmailAndPassword({
        email: data.email,
        password: data.password,
      });
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
