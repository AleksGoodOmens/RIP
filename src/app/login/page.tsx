'use client';

import { useRouter } from 'next/navigation';

import AuthForm from '@/components/AuthForm';
import Navbar from '@/components/NavBar';

export default function LoginPage() {
  const router = useRouter();

  return (
    <>
      <Navbar />
      <AuthForm mode="login" onSuccess={() => router.push('/home')} />
    </>
  );
}
