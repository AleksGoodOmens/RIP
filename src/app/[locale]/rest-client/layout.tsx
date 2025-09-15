'use client';

import { useRouter } from 'next/navigation';
import { PropsWithChildren, ReactNode, useContext, useEffect } from 'react';

import { AuthContext } from '@/context/authContext';

interface Prop extends PropsWithChildren {
  method: ReactNode;
}

export default function RestClientLayout({ children, method }: Prop) {
  const { user, loading } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!user) router.push('/');
  }, [user, router]);
  return (
    <section>
      {user && !loading && (
        <>
          {children} {method}
        </>
      )}
      {loading && <div>Checking auth user</div>}
    </section>
  );
}
