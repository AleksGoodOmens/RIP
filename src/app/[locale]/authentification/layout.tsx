'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { PropsWithChildren, useContext, useEffect } from 'react';

import { Navbar } from '@/components';
import { AuthContext } from '@/context/authContext';

export default function AuthLayout({ children }: PropsWithChildren) {
  const { user, loading } = useContext(AuthContext);
  const t = useTranslations('toasts');
  const router = useRouter();

  useEffect(() => {
    if (user && !loading) {
      router.push('/');
    }
  }, [user, loading, router, t]);
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
