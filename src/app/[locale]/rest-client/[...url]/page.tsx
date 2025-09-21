import dynamic from 'next/dynamic';
import { getTranslations } from 'next-intl/server';

import { Text } from '@/components';

const RestClient = dynamic(() => import('@/components/rest-client/RestClient'), {
  loading: () => <p>Loading REST Client...</p>,
});

export default async function UrlPage() {
  const t = await getTranslations('rest-client.titles');

  return (
    <section>
      <Text as="h1" variant={'main-title'}>
        {t('main')}
      </Text>
      <RestClient />
    </section>
  );
}
