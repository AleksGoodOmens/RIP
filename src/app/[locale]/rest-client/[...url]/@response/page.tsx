import { HighlighterResponse } from '@/components';

import { getResponse } from '../action';

interface Props {
  params: Promise<{ url: [method: string, urlCode64: string, headersBase64: string] }>;
}

export default async function RestClientPage({ params }: Props) {
  const { url } = await params;
  const method = url[0];
  const urlBase64 = url[1];
  const headersBase64 = url[2];

  const result = await getResponse({
    urlInBase64: urlBase64,
    method,
    headersBase64,
  });

  if (!result) return <div>Unexpected error</div>;

  return (
    <div>
      <HighlighterResponse responseBody={result.body} responseStatus={result.status} />
    </div>
  );
}
