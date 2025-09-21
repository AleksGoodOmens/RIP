'use client';
import { useTranslations } from 'next-intl';

import { Button, Text } from '@/components';
import { Link } from '@/i18n/navigation';

export const HistoryEmpty = () => {
  const t = useTranslations('history');
  return (
    <div>
      <Text align={'center'} className="py-10">
        {t.rich('emptyMessage', {
          block: (chunks) => <span className="block">{chunks}</span>,
        })}
      </Text>
      <Button className="mx-auto block w-fit" variant={'link'} asChild>
        <Link href={'/rest-client/GET'}>Rest client</Link>
      </Button>
    </div>
  );
};
