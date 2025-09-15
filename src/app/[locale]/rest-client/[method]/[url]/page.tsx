'use client';

import { useParams } from 'next/navigation';

import { HttpMethod } from '@/components';
import RestClient from '@/components/rest-client/RestClient';

export default function RestClientPage() {
  const params = useParams<{
    method: HttpMethod;
    url: string;
  }>();

  const method = params?.method;
  const decodedUrl = params?.url ? atob(decodeURIComponent(params.url)) : '';

  return <RestClient initialMethod={method} initialUrl={decodedUrl} />;
}
