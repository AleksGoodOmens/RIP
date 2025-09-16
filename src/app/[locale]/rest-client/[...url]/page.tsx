import dynamic from 'next/dynamic';

import { HttpMethod } from '@/components';

interface Props {
  params: Promise<{ url: string[] }>;
}

const RestClient = dynamic(() => import('@/components/rest-client/RestClient'), {
  loading: () => <p>Loading REST Client...</p>,
});

export default async function RestClientPage({ params }: Props) {
  const initialMethod = (await params).url[0] as HttpMethod;
  return <RestClient initialMethod={initialMethod} />;
}
