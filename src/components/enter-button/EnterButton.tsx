'use client';
import { LogIn, LogOut } from 'lucide-react';
import { useContext } from 'react';

import { AuthContext } from '@/context/authContext';
import { doSignOut } from '@/firebase/auth';
import { Link } from '@/i18n/navigation';

import { Button } from '../ui';

export const EnterButton = () => {
  const { user } = useContext(AuthContext);

  return (
    <>
      {user && (
        <Button aria-label="logout" variant={'destructive'} onClick={doSignOut}>
          <LogOut />
        </Button>
      )}

      {!user && <Link href={'/authentification/login'}>{<LogIn />}</Link>}
    </>
  );
};
