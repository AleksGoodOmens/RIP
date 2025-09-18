'use client';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { FormEvent, useContext, useEffect, useMemo, useState } from 'react';

import {
  RequestBodyEditor,
  SelectMethod,
  Button,
  PairsEditor,
  CodeGenerator,
  AccordionWrapper,
} from '@/components';
import { AuthContext } from '@/context/authContext';
import { HttpMethod, IPair } from '@/interfaces';
import { encodeTo64 } from '@/lib/utils';
import { encodeVariables, replaceVariables } from '@/lib/variableTransform';

import { HighlightedUrl } from '../highlighted-url/HighlightedUrl';

interface RestClientProps {
  initialMethod?: HttpMethod;
  initialUrl?: string;
  initialBody?: string;
}

export default function RestClient({
  initialMethod,
  initialUrl,
  initialBody = '',
}: RestClientProps) {
  const t = useTranslations('rest-client');
  const router = useRouter();

  const [method, setMethod] = useState(initialMethod || 'GET');
  const [variables, setVariables] = useState<IPair[]>(() =>
    JSON.parse(localStorage.getItem('variablesRIP') || '[]')
  );
  const [url, setUrl] = useState(encodeVariables(initialUrl || '', Object.fromEntries(variables)));
  const [headers, setHeaders] = useState<IPair[]>(() =>
    JSON.parse(localStorage.getItem('headersRIP') || "[['Content-type', 'application/json']]")
  );
  const [body, setBody] = useState(initialBody);

  useEffect(() => {
    localStorage.setItem('variablesRIP', JSON.stringify(variables));
  }, [variables]);

  useEffect(() => {
    localStorage.setItem('headersRIP', JSON.stringify(headers));
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const headersObject = Object.fromEntries(headers);
    const apiUrlBase64 = encodeTo64(replaceVariables(url, Object.fromEntries(variables)));
    const headersBase64 = encodeTo64(JSON.stringify(headersObject));
    const bodyBase64 = body ? encodeTo64(body) : '';

    router.push(`/rest-client/${method}/${apiUrlBase64}/${headersBase64}/${bodyBase64}`);
  };

  const isDisabled = !Boolean(url);

  return (
    <>
      <form className="flex gap-1" onSubmit={handleSubmit}>
        <SelectMethod name="select" value={method} onValueChange={setMethod} />
        <HighlightedUrl
          name="url-input"
          value={url}
          onChange={(e) => setUrl(e.target.value.trimStart())}
          placeholder={t('url-placeholder')}
          variables={Object.fromEntries(variables)}
        />
        <Button disabled={isDisabled} type="submit">
          {t('send')}
        </Button>
      </form>
      <section className="grid sm:grid-cols-2 items-start gap-4 my-4">
        <AccordionWrapper title={t('titles.variables')}>
          <PairsEditor pairs={variables} onPairsChange={setVariables} />
        </AccordionWrapper>
        <AccordionWrapper title={t('titles.headers')}>
          <PairsEditor pairs={headers} onPairsChange={setHeaders} />
        </AccordionWrapper>
        <AccordionWrapper title={t('titles.body')}>
          <RequestBodyEditor value={body} onChange={setBody} />
        </AccordionWrapper>
        <AccordionWrapper title={t('titles.snippets')}>
          <CodeGenerator request={{ method, url, headers, body }} />
        </AccordionWrapper>
      </section>
    </>
  );
}
