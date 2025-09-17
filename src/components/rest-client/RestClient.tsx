'use client';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { FormEvent, useState } from 'react';

import {
  RequestBodyEditor,
  SelectMethod,
  Button,
  Input,
  PairsEditor,
  CodeGenerator,
  AccordionWrapper,
} from '@/components';
import { HttpMethod, IPair } from '@/interfaces';
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
  const [body, setBody] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const headersObject = Object.fromEntries(headers);
    const apiUrlBase64 = encodeTo64(url);
    const headersBase64 = encodeTo64(JSON.stringify(headersObject));
    const bodyBase64 = body ? encodeTo64(body) : '';

    router.push(`/rest-client/${method}/${apiUrlBase64}/${headersBase64}/${bodyBase64}`);
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
      <AccordionWrapper title={t('titles.headers')}>
        <PairsEditor pairs={headers} onPairsChange={(pairs) => setHeaders(pairs)} />
      </AccordionWrapper>
      <AccordionWrapper title={t('titles.body')}>
        <RequestBodyEditor value={body} onChange={setBody} />
      </AccordionWrapper>
      <AccordionWrapper title={t('titles.snippets')}>
        <CodeGenerator request={{ method, url, headers }} />
      </AccordionWrapper>
    </>
  );
}
