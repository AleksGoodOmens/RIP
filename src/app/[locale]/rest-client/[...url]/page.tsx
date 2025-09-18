import dynamic from 'next/dynamic';

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
  const bodyBase64: string | undefined = url[3];

  const initialMethod = url[0] as HttpMethod;
  const initialUrl = urlBase64 ? decodeToString(urlBase64) : '';
  const initialBody = bodyBase64 ? decodeToString(bodyBase64) : '';

  return (
    <RestClient initialMethod={initialMethod} initialUrl={initialUrl} initialBody={initialBody} />
  );
}
