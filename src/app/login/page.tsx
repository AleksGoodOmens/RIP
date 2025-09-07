'use client';

import { useRouter } from 'next/navigation';

import AuthForm from '@/components/AuthForm';
import Navbar from '@/components/NavBar';

export default function LoginPage() {
  const router = useRouter();

  return (
    <>
      <Navbar />
      <h4>Please, login</h4>
      <AuthForm mode="login" onSuccess={() => router.push('/home')} />
    </>
  );
}
