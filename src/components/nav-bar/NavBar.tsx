'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { Button } from '../ui';

function Navbar() {
  const t = useTranslations();
  return (
    <nav>
      <Button variant="link" asChild>
        <Link href="/authentification/login">{t('button.login')}</Link>
      </Button>
      <Button variant="link" asChild>
        <Link href="/authentification/register">{t('button.register')}</Link>
      </Button>
    </nav>
  );
}

export { Navbar };
