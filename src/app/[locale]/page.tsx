import dynamic from 'next/dynamic';

const Content = dynamic(() => import('./components/Content'), {
  loading: () => <p>Loading home page Client...</p>,
});

export default function Home() {
  return <Content />;
}
