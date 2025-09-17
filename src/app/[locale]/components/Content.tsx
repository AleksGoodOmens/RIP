'use client';

import { useTranslations } from 'next-intl';
import { useContext } from 'react';

import { Text, Navbar } from '@/components';
import { AuthContext } from '@/context/authContext';

export const Content = () => {
  const { user } = useContext(AuthContext);
  const t = useTranslations('home');

  return (
    <div className="grid place-content-center py-4">
      {!user && (
        <div>
          <Text as="h1" size={'xl'}>
            {t('greetings')}!
          </Text>
          <Navbar />
        </div>
      )}

      {user && (
        <Text as="h1" size={'xl'}>
          {t('greetings')} {user.email}!
        </Text>
      )}
    </div>
  );
};
