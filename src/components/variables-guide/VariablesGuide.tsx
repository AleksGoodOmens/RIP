import { getTranslations } from 'next-intl/server';

import { Text } from '@/components';

export const VariablesGuide = async () => {
  const t = await getTranslations('variables');

  return (
    <div className="space-y-4 p-4">
      <Text as="h2" size={'lg'} className="text-xl font-semibold text-destructive">
        {t('variablesGuide.title')}
      </Text>

      <Text>{t('variablesGuide.intro')}</Text>

      <Text as="h3" className="text-lg font-medium mt-6">
        {t('variablesGuide.howToUse')}
      </Text>

      <Text as="h4" variant={'list-title'}>
        {t('variablesGuide.syntaxTitle')}
      </Text>

      <Text>{t('variablesGuide.syntaxDescription')}</Text>

      <pre className="p-3 rounded-md text-sm font-mono overflow-x-auto">
        {'{{'}variable_name{'}}'}
      </pre>

      <Text as="h4" variant={'list-title'}>
        {t('variablesGuide.usagePlacesTitle')}
      </Text>

      <ul className="list-disc pl-5 space-y-2">
        <li>
          <Text>
            <strong>{t('variablesGuide.usagePlaces.url')}</strong>
            <code>
              https://api.example.com/{'{{'}resource{'}}'}/{'{{'}id{'}}'}
            </code>
          </Text>
        </li>
        <li>
          <Text>
            <strong>{t('variablesGuide.usagePlaces.headers')}</strong>
            <code>
              Authorization: Bearer {'{{'}api_token{'}}'}
            </code>
          </Text>
        </li>
        <li>
          <Text>
            <strong>{t('variablesGuide.usagePlaces.body')}</strong>
          </Text>
          <pre className="p-3 rounded-md text-sm font-mono overflow-x-auto mt-2">
            {`{
  "user": "{{username}}",
  "email": "{{user_email}}"
}`}
          </pre>
        </li>
      </ul>

      <Text as="h4" variant={'list-title'}>
        {t('variablesGuide.examplesTitle')}
      </Text>

      <ul className="list-disc pl-5 space-y-2">
        <li>
          <Text>
            {t('variablesGuide.examples.urlExample')}
            <code>
              https://wwww.npmjs.com/{'{{'}packageName{'}}'}
            </code>
          </Text>
        </li>
        <li>
          <Text>
            {t('variablesGuide.examples.headerExample')}
            <code>
              Content-Type: {'{{'}APPLICATION_JSON{'}}'}
            </code>
          </Text>
        </li>
        <li>
          <Text>{t('variablesGuide.examples.bodyExample')}</Text>
          <pre className="p-3 rounded-md text-sm font-mono overflow-x-auto mt-2">
            {`{
  "foo": "{{BAR}}",
  "items": ["{{item1}}", "{{item2}}"]
}`}
          </pre>
        </li>
      </ul>

      <Text as="h4" variant={'list-title'}>
        {t('variablesGuide.featuresTitle')}
      </Text>

      <ul className="list-disc pl-5 space-y-2">
        <li>
          <Text>{t('variablesGuide.features.storage')}</Text>
        </li>
        <li>
          <Text>{t('variablesGuide.features.autoload')}</Text>
        </li>
        <li>
          <Text>{t('variablesGuide.features.lazyLoad')}</Text>
        </li>
      </ul>

      <Text as="h4" variant={'list-title'}>
        {t('variablesGuide.tipsTitle')}
      </Text>

      <ul className="list-disc pl-5 space-y-2">
        <li>
          <Text>{t('variablesGuide.tips.naming')}</Text>
        </li>
        <li>
          <Text>{t('variablesGuide.tips.confidential')}</Text>
        </li>
        <li>
          <Text>{t('variablesGuide.tips.validation')}</Text>
        </li>
      </ul>

      <Text className="mt-4 font-medium">{t('variablesGuide.conclusion')}</Text>
    </div>
  );
};
