import { onAuthStateChanged, User } from 'firebase/auth';
import React, { useEffect, useState, ReactNode, useContext } from 'react';

import { auth } from '../../firebase/firebase';

interface AuthContextType {
  user: User | null;
  userLoggedIn: boolean;
  loading: boolean;
}

const defaultAuthContext: AuthContextType = {
  user: null,
  userLoggedIn: false,
  loading: true,
};

export const AuthContext = React.createContext<AuthContextType>(defaultAuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [userLoggedIn, setUserLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        setUserLoggedIn(true);
      } else {
        setUser(null);
        setUserLoggedIn(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value: AuthContextType = {
    user,
    userLoggedIn,
    loading,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}
