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
  const initialMethod = (await params).url[0] as HttpMethod;
  const urlBase64: string | undefined = (await params).url[1];

  const initialUrl = urlBase64 ? decodeToString(urlBase64) : '';
  return <RestClient initialMethod={initialMethod} initialUrl={initialUrl} />;
}
