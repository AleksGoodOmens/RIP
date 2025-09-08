'use client';

import { useRouter } from 'next/navigation';

import RegisterForm from './components/RegisterForm';

export default function RegisterPage() {
  const router = useRouter();

  return (
    <>
      <h4>Please, register</h4>
      <RegisterForm onSuccess={() => router.push('/login')} />
    </>
  );
}
