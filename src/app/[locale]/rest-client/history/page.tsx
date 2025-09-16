import { getTranslations } from 'next-intl/server';

import { Button, Text } from '@/components';
import { Link } from '@/i18n/navigation';

const HistoryPage = async () => {
  const t = await getTranslations('history');
  return (
    <section>
      <Text as={'h1'} size={'xl'} className="py-6">
        {t('title')}
      </Text>
      <Text align={'center'} className="py-10">
        {t.rich('emptyMessage', {
          block: (chunks) => <div>{chunks}</div>,
        })}
      </Text>
      <Button className="mx-auto block w-fit" variant={'link'} asChild>
        <Link href={'/rest-client/GET'}>Rest client</Link>
      </Button>
    </section>
  );
};

export default HistoryPage;
