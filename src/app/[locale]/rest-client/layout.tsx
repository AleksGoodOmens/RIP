'use client';

import { useRouter } from 'next/navigation';
import { PropsWithChildren, useContext, useEffect } from 'react';

import { AuthContext } from '@/context/authContext';

export default function RestClientLayout({ children }: PropsWithChildren) {
  const { user, loading } = useContext(AuthContext);

  const router = useRouter();

  useEffect(() => {
    if (!user) router.push('/');
  }, [user, router]);

  if (!user) return null;

  return (
    <section className="fadeIn-children">
      {user && !loading && children}
      {loading && <div>Checking auth user</div>}
    </section>
  );
}
