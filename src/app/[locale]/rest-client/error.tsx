'use client';

import { useTranslations } from 'next-intl';

import { Button, Text } from '@/components';

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}
export default function Error({ error, reset }: Props) {
  const t = useTranslations('errors');
  return (
    <section className="container mx-auto grid gap-4 place-content-center">
      <Text as={'h2'}>{t('titleBoundary')}</Text>
      <Text>{error.message}</Text>
      <Button variant={'destructive'} onClick={() => reset()}>
        {t('reset')}
      </Button>
    </section>
  );
}
