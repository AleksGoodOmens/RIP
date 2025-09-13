import dynamic from 'next/dynamic';

const RestClient = dynamic(() => import('@/components/rest-client/RestClient'), {
  loading: () => <p>Loading REST Client...</p>,
});

export default function RestClientPage() {
  return <RestClient />;
}
