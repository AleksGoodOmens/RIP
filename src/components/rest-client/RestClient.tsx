'use client';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { FormEvent, useState } from 'react';

import { SelectMethod, Button, Input, HttpMethod, PairsEditor } from '@/components';
import { IPair } from '@/interfaces';
import { encodeTo64 } from '@/lib/utils';

interface RestClientProps {
  initialMethod?: HttpMethod;
  initialUrl?: string;
}

export default function RestClient({ initialMethod, initialUrl }: RestClientProps) {
  const t = useTranslations('rest-client');
  const router = useRouter();

  const [method, setMethod] = useState(initialMethod || 'GET');
  const [url, setUrl] = useState(initialUrl || '');

  const [headers, setHeaders] = useState<IPair[]>([['Content-type', 'application/json']]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const headersObject = Object.fromEntries(headers);

    const apiUrlBase64 = encodeTo64(url);
    const headersBase64 = encodeTo64(JSON.stringify(headersObject));

    router.push(`/rest-client/${method}/${apiUrlBase64}/${headersBase64}`);
  };

  const isDisabled = !Boolean(url);

  return (
    <>
      <form className="flex gap-1" onSubmit={handleSubmit}>
        <SelectMethod name="select" value={method} onValueChange={(value) => setMethod(value)} />
        <Input
          name="url-input"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder={t('url-placeholder')}
        />
        <Button disabled={isDisabled} type="submit">
          {t('send')}
        </Button>
      </form>
      <PairsEditor title="Headers" pairs={headers} onPairsChange={(pairs) => setHeaders(pairs)} />
    </>
  );
}
