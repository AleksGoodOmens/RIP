'use client';

import { useRouter } from 'next/navigation';
import { PropsWithChildren, useContext, useEffect } from 'react';

import { Navbar } from '@/components';
import { AuthContext } from '@/context/authContext';

export default function AuthLayout({ children }: PropsWithChildren) {
  const { user, loading } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (user) router.push('/');
  }, [user, router]);
  return (
    <section className="flex flex-col items-center justify-center bg-background">
      {!user && !loading && (
        <>
          <Navbar />
          {children}
        </>
      )}
      {loading && <div>Checking auth user</div>}
    </section>
  );
}
