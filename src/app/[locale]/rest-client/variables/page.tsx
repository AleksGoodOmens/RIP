import dynamic from 'next/dynamic';

import { Text } from '@/components';

const VariablesClient = dynamic(() => import('@/components/variables-client/VariablesClient'), {
  loading: () => <p>Loading Variables Client...</p>,
});
const VariablePage = () => {
  return (
    <section>
      <Text as={'h1'} variant={'main-title'}>
        RIP Variables
      </Text>
      <VariablesClient />
    </section>
  );
};
export default VariablePage;
