import dynamic from 'next/dynamic';
import { getTranslations } from 'next-intl/server';

import { AccordionWrapper, Text, VariablesGuide } from '@/components';

const VariablesClient = dynamic(() => import('@/components/variables-client/VariablesClient'), {
  loading: () => <p>Loading Variables Client...</p>,
});
const VariablePage = async () => {
  const t = await getTranslations('variables');
  return (
    <section>
      <Text as={'h1'} variant={'main-title'}>
        RIP {t('title')}
      </Text>
      <VariablesClient />
      <br />
      <AccordionWrapper title={t('guide')}>
        <VariablesGuide />
      </AccordionWrapper>
    </section>
  );
};
export default VariablePage;
