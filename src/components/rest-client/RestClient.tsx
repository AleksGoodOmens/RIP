'use client';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { FormEvent, useMemo, useState } from 'react';

import {
  RequestBodyEditor,
  SelectMethod,
  Button,
  PairsEditor,
  CodeGenerator,
  AccordionWrapper,
} from '@/components';
import { HttpMethod, IPair } from '@/interfaces';
import { encodeTo64 } from '@/lib/utils';
import { encodeVariables, replaceVariables, replaceVariablesIsPair } from '@/lib/variableTransform';

import { HighlightedUrl } from '../highlighted-url/HighlightedUrl';

interface RestClientProps {
  initialMethod?: HttpMethod;
  initialUrl?: string;
  initialBody?: string;
  initialHeaders?: string;
}

export default function RestClient({
  initialMethod,
  initialUrl,
  initialBody = '',
  initialHeaders = '[]',
}: RestClientProps) {
  const t = useTranslations('rest-client');
  const router = useRouter();

  const [method, setMethod] = useState(initialMethod || 'GET');
  const [variables] = useState<IPair[]>(() =>
    JSON.parse(localStorage.getItem('variablesRIP') || '[]')
  );

  const variablesObject = useMemo(() => {
    return Object.fromEntries(variables);
  }, [variables]);
  const [url, setUrl] = useState(encodeVariables(initialUrl || '', variablesObject));
  const [headers, setHeaders] = useState<IPair[]>(
    JSON.parse(encodeVariables(initialHeaders, variablesObject))
  );
  const [body, setBody] = useState(initialBody);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const cleanHeaders = headers.map((pair) => replaceVariablesIsPair(pair, variablesObject));
    console.log(cleanHeaders);
    const apiUrlBase64 = encodeTo64(replaceVariables(url, variablesObject));
    const headersBase64 = encodeTo64(JSON.stringify(cleanHeaders));
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
      <section className="grid lg:grid-cols-3 items-start gap-4 my-4">
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
