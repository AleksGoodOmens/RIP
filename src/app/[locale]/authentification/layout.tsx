'use client';

import { useRouter } from 'next/navigation';
import { PropsWithChildren, useContext, useEffect } from 'react';

import Navbar from '@/components/NavBar';
import { AuthContext } from '@/context/authContext';

export default function AuthLayout({ children }: PropsWithChildren) {
  const { user, loading } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (user) router.push('/');
  }, [user, router]);
  return (
    <section>
      {!user && (
        <>
          <Navbar />
          {children}
        </>
      )}
      {loading && <div>Checking auth user</div>}
    </section>
  );
}
