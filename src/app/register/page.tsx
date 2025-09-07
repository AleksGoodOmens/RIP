'use client';

import { useRouter } from 'next/navigation';

import AuthForm from '@/components/AuthForm';
import Navbar from '@/components/NavBar';

export default function RegisterPage() {
  const router = useRouter();

  return (
    <>
      <Navbar />
      <AuthForm mode="register" onSuccess={() => router.push('/login')} />
    </>
  );
}
