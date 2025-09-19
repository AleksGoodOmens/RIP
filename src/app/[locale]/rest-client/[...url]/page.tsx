import dynamic from 'next/dynamic';
import { getTranslations } from 'next-intl/server';

import { Text } from '@/components';
import { HttpMethod } from '@/interfaces';
import { decodeToString } from '@/lib/utils';

interface Props {
  params: Promise<{ url: string[] }>;
}

const RestClient = dynamic(() => import('@/components/rest-client/RestClient'), {
  loading: () => <p>Loading REST Client...</p>,
});

export default async function RestClientPage({ params }: Props) {
  const { url } = await params;
  const urlBase64: string | undefined = url[1];
  const headersBase64: string | undefined = url[2];
  const bodyBase64: string | undefined = url[3];

  const t = await getTranslations('rest-client.titles');

  const initialMethod = url[0] as HttpMethod;
  const initialUrl = urlBase64 ? decodeToString(urlBase64) : '';
  const initialBody = bodyBase64 ? decodeToString(bodyBase64) : '';
  const initialHeaders = headersBase64 ? decodeToString(headersBase64) : '[]';

  return (
    <section>
      <Text as="h1" variant={'main-title'}>
        {t('main')}
      </Text>
      <RestClient
        initialMethod={initialMethod}
        initialUrl={initialUrl}
        initialBody={initialBody}
        initialHeaders={initialHeaders}
      />
    </section>
  );
}
