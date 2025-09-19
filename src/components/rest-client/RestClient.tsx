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
import { encodeTo64, replaceVariablesInBody, replaceVariablesInPairs } from '@/lib/utils';
import { encodeVariables, replaceVariables } from '@/lib/variableTransform';

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
  initialBody,
  initialHeaders,
}: RestClientProps) {
  const t = useTranslations();
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
    initialHeaders ? JSON.parse(encodeVariables(initialHeaders, variablesObject)) : []
  );

  const [body, setBody] = useState(
    initialBody ? encodeVariables(initialBody, variablesObject) : ''
  );

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const replacedUrl = replaceVariables(url, variablesObject);
    const replacedHeaders = replaceVariablesInPairs(headers, variablesObject);
    const replacedBody = replaceVariablesInBody(body, variablesObject);
    const urlBase64 = encodeTo64(replacedUrl);
    const headersBase64 = encodeTo64(JSON.stringify(replacedHeaders));

    let bodyBase64 = '';
    if (replacedBody !== undefined && replacedBody !== null && replacedBody !== '') {
      if (typeof replacedBody === 'string') {
        bodyBase64 = encodeTo64(replacedBody);
      } else {
        bodyBase64 = encodeTo64(JSON.stringify(replacedBody));
      }
    }

    router.push(`/rest-client/${method}/${urlBase64}/${headersBase64}/${bodyBase64}`);
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
          placeholder={t('rest-client.url-placeholder')}
          variables={Object.fromEntries(variables)}
        />
        <Button disabled={isDisabled} type="submit">
          {t('rest-client.send')}
        </Button>
      </form>
      <section className="grid lg:grid-cols-3 items-start gap-4 my-4">
        <AccordionWrapper title={t('rest-client.titles.headers')}>
          <PairsEditor
            pairs={headers}
            onPairsChange={setHeaders}
            messages={{
              deleted: t('toasts.headers.deleted'),
              updated: t('toasts.headers.updated'),
              added: t('toasts.headers.added'),
            }}
          />
        </AccordionWrapper>
        <AccordionWrapper title={t('rest-client.titles.body')}>
          <RequestBodyEditor value={body} onChange={setBody} />
        </AccordionWrapper>
        <AccordionWrapper title={t('rest-client.titles.snippets')}>
          <CodeGenerator request={{ method, url, headers, body }} />
        </AccordionWrapper>
      </section>
    </>
  );
}
