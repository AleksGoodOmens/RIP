'use client';

import { useContext } from 'react';

import { Text } from '@/components';
import Navbar from '@/components/NavBar';
import { AuthContext } from '@/context/authContext';

export const Content = () => {
  const { user } = useContext(AuthContext);

  return (
    <div>
      {!user && (
        <div>
          <Text as="h1" size={'xl'}>
            Welcome!
          </Text>{' '}
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
