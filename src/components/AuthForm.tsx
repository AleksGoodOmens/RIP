'use client';

import { useState } from 'react';

import {
  doSignInWithGoogle,
  doCreateUserWithEmailAndPassword,
  doSignInWithEmailAndPassword,
} from '@/firebase/auth';

type Mode = 'login' | 'register';

interface AuthFormProps {
  mode: Mode;
  onSuccess: () => void;
}

export default function AuthForm({ mode, onSuccess }: AuthFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      if (mode === 'login') {
        await doSignInWithEmailAndPassword({ email, password });
      } else {
        await doCreateUserWithEmailAndPassword({ email, password });
      }
      onSuccess();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage('Authentication failed');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsSubmitting(true);
    try {
      await doSignInWithGoogle();
      onSuccess();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage('Google sign-in failed');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        {errorMessage && <p>{errorMessage}</p>}
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Processing...' : mode === 'login' ? 'Enter' : 'Register'}
        </button>
      </form>

      <button onClick={() => void handleGoogleSignIn()} disabled={isSubmitting}>
        {isSubmitting ? 'Signing in...' : 'Sign in with Google'}
      </button>
    </div>
  );
}
