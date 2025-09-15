'use client';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { FormEvent, useState } from 'react';

import { SelectMethod, Button, Input, HttpMethod } from '@/components';
import { sendUniversalRequest, type RequestResult } from '@/lib/api-request';

interface RestClientProps {
  initialMethod?: HttpMethod;
  initialUrl?: string;
}

export default function RestClient({ initialMethod, initialUrl }: RestClientProps) {
  const t = useTranslations('rest-client');
  const router = useRouter();
  const pathname = usePathname();
  const [method] = useState(initialMethod || 'GET');
  const [url, setUrl] = useState(initialUrl || '');
  const [result, setResult] = useState<RequestResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setResult(null);

    try {
      const response = await sendUniversalRequest(url, method);
      setResult(response);

      const encodedUrl = encodeURIComponent(btoa(url));

      const locale = pathname.split('/')[1];
      const path = `/${locale}/rest-client/${method}/${encodedUrl}`;
      router.push(path);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message || 'Oops! Request failed');
      }
    }
  };

  return (
    <div>
      <form className="flex gap-1" onSubmit={handleSubmit}>
        <SelectMethod name="select" value={method} />
        <Input
          name="url-input"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder={t('url-placeholder')}
        />
        <Button type="submit">{t('send')}</Button>
      </form>

      {error && <div className="text-red-500">{error}</div>}

      {result && (
        <div className="mt-4">
          <h3>Response</h3>
          <p>
            <strong>Status:</strong> {result.status}
          </p>
          <h4>Headers</h4>
          <pre>{JSON.stringify(result.headers, null, 2)}</pre>
          <h4>Body</h4>
          <pre>{JSON.stringify(result.body, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
