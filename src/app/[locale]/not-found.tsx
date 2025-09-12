import Image from 'next/image';
import { getTranslations } from 'next-intl/server';

import { Text } from '@/components';
import { Link } from '@/i18n/navigation';

import candleImage from './images/candle.gif';

const NotFound = async () => {
  const t = await getTranslations('notFound');

  return (
    <section className="grid place-content-center gap-4 p-4">
      <Text as={'h1'} size={'xl'}>
        {t('header')}
      </Text>
      <Link href={'/'} className="uppercase">
        {t('button')}
      </Link>
      <Image alt="candle" src={candleImage} width={200} className="mx-auto rounded-4xl" />
    </section>
  );
};
export default NotFound;
