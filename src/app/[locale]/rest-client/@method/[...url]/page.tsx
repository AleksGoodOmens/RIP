import { Text } from '@/components';

import { getResponse } from './action';

interface Props {
  params: Promise<{ url: [method: string, urlCode64: string, headersBase64: string] }>;
}

export default async function RestClientPage({ params }: Props) {
  const { url } = await params;
  const method = url[0];
  const urlBase64 = url[1];
  const headersBase64 = url[2];

  console.log(url);

  const result = await getResponse({
    urlInBase64: urlBase64,
    method,
    headersBase64,
  });

  if (!result) return <div>Unexpected error</div>;

  return (
    <div>
      <div className="mt-4">
        <Text as={'h3'}>Response</Text>
        <p>
          <strong>Status:</strong> {result.status}
        </p>
        <h4>Body</h4>
        <pre>{JSON.stringify(result.body, null, 2)}</pre>
      </div>
    </div>
  );
}
