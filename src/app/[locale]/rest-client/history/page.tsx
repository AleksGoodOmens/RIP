import { getTranslations } from 'next-intl/server';

import { HistoryClient, Text } from '@/components';

const HistoryPage = async () => {
  const t = await getTranslations('history');

  return (
    <section>
      <Text as={'h1'} variant={'main-title'}>
        {t('title')}
      </Text>
      <HistoryClient />
    </section>
  );
};

export default HistoryPage;
