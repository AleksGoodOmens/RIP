'use client';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { FormEvent } from 'react';

import { SelectMethod, Button, Input } from '@/components';

export function RestClient() {
  const t = useTranslations('rest-client');

  const router = useRouter();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const url = formData.get('url-input') as string;
    const method = formData.get('select') as string;
    if (!url) return;
    const encodedUrl = btoa(url);
    const path = `/${method}/${encodedUrl}`;
    router.push(path);
  };
  return (
    <div>
      <form className="flex gap-1" onSubmit={handleSubmit}>
        <SelectMethod name="select" />
        <Input name="url-input" placeholder={t('url-placeholder')} />
        <Button type="submit">{t('send')}</Button>
      </form>
    </div>
  );
}
