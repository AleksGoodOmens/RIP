'use client';

import { useRouter } from 'next/navigation';

import LoginForm from '@/app/authentification/login/components/LoginForm';

export default function LoginPage() {
  const router = useRouter();

  return (
    <>
      <h4>Please, login</h4>
      <LoginForm onSuccess={() => router.push('/home')} />
    </>
  );
}
