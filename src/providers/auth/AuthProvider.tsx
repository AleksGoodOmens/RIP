'use client';

import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { useTranslations } from 'next-intl';
import { PropsWithChildren, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { AuthContext } from '@/context/authContext';
import { auth } from '@/firebase/firebase';

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const t = useTranslations('toasts');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [t]);

  const logout = async () => {
    await signOut(auth);
    toast.info(t('logout'), {
      toastId: 'logout',
    });
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
