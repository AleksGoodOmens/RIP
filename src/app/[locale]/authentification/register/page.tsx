import { getTranslations } from 'next-intl/server';

import { Text } from '@/components';

import RegisterForm from './components/RegisterForm';

export default async function RegisterPage() {
  const t = await getTranslations();
  return (
    <div className="flex min-h-screen items-start justify-center px-4 pt-32 bg-background">
      <div className="w-full max-w-md space-y-6 rounded-lg border border-border bg-card p-6 shadow-md">
        <Text size="sm" align="center" as="h4" className="mb-4">
          {t('register.header')}
        </Text>
        <RegisterForm />
      </div>
    </div>
  );
}
