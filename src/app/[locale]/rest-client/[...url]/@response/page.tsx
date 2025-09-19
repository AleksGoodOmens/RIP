import { getTranslations } from 'next-intl/server';

import { AccordionWrapper, HighlighterResponse } from '@/components';

import { getResponse } from '../action';

interface Props {
  params: Promise<{
    url: [method: string, urlCode64: string, headersBase64: string, bodyBase64?: string];
  }>;
}

export default async function RestClientPage({ params }: Props) {
  const { url } = await params;
  const method = url[0];
  const urlBase64 = url[1];
  const headersBase64 = url[2];
  const bodyBase64 = url[3] || '';

  const t = await getTranslations('rest-client.titles');

  const result = await getResponse({
    urlInBase64: urlBase64,
    method,
    headersBase64,
    bodyBase64,
  });

  if (!result) return <div>Unexpected error</div>;

  return (
    <AccordionWrapper title={t('response')} collapsed={false}>
      <HighlighterResponse responseBody={result.body} responseStatus={result.status} />
    </AccordionWrapper>
  );
}
