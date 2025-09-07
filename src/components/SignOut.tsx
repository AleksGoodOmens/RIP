'use client';

import { useRouter } from 'next/navigation';

import { doSignOut } from '@/firebase/auth';

export default function SignOutButton() {
  const router = useRouter();

  const handleSignOut = async (): Promise<void> => {
    try {
      await doSignOut();
      router.push('/');
    } catch (err) {
      console.error('Sign-out failed:', err);
    }
  };

  return <button onClick={() => void handleSignOut()}>Sign out</button>;
}
