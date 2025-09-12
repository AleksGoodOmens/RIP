'use client';

import { useContext } from 'react';

import { Text, Navbar } from '@/components';
import { AuthContext } from '@/context/authContext';

export const Content = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="grid place-content-center py-4">
      {!user && (
        <div>
          <Text as="h1" size={'xl'}>
            Welcome!
          </Text>
          <Navbar />
        </div>
      )}

      {user && (
        <Text as="h1" size={'xl'}>
          Welcome {user.email}!
        </Text>
      )}
    </div>
  );
};
