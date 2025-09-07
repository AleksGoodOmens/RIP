'use client';

import { useRouter } from 'next/navigation';

import AuthForm from '@/components/AuthForm';
import Navbar from '@/components/NavBar';

export default function RegisterPage() {
  const router = useRouter();

  return (
    <>
      <Navbar />
      <h4>Please, register</h4>
      <AuthForm mode="register" onSuccess={() => router.push('/login')} />
    </>
  );
}
