'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { doSignOut } from '@/firebase/auth';

import { Button } from '../ui';

function SignOutButton() {
  const t = useTranslations();
  const router = useRouter();

  const handleSignOut = async (): Promise<void> => {
    try {
      await doSignOut();
      router.push('/');
    } catch {}
  };

  return (
    <Button variant="outline" onClick={() => void handleSignOut()}>
      {t('button.signout')}
    </Button>
  );
}

export { SignOutButton };
