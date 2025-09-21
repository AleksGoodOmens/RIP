'use client';
import { useParams, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { FormEvent, useEffect, useMemo, useState } from 'react';

import { getResponse } from '@/app/[locale]/rest-client/[...url]/action';
import {
  RequestBodyEditor,
  SelectMethod,
  Button,
  PairsEditor,
  CodeGenerator,
  AccordionWrapper,
  HighlighterResponse,
} from '@/components';
import { auth } from '@/firebase/firebase';
import { HttpMethod, IPair, RequestResult } from '@/interfaces';
import {
  decodeToString,
  encodeTo64,
  replaceVariablesInBody,
  replaceVariablesInPairs,
} from '@/lib/utils';
import { encodeVariables, replaceVariables } from '@/lib/variableTransform';

import { HighlightedUrl } from '../highlighted-url/HighlightedUrl';

export default function RestClient() {
  const { url } = useParams();
  const router = useRouter();
  const t = useTranslations();
  const uid = auth.currentUser?.uid as string;

  const urlBase64: string = (url && url[1]) || '';
  const headersBase64: string = (url && url[2]) || '';
  const bodyBase64: string = (url && url[3]) || '';

  const initialMethod = url ? (url[0] as HttpMethod) : 'GET';
  const initialUrl = urlBase64 && decodeToString(urlBase64);
  const initialBody = bodyBase64 && decodeToString(bodyBase64);
  const initialHeaders = headersBase64 && decodeToString(headersBase64);

  const [responseData, setResponseData] = useState<RequestResult | undefined>(undefined);
  const [method, setMethod] = useState(initialMethod);
  const [variables] = useState<IPair[]>(() =>
    JSON.parse(localStorage.getItem('variablesRIP') || '[]')
  );

  useEffect(() => {
    getResponse({
      bodyBase64,
      headersBase64,
      method: initialMethod,
      urlBase64,
      uid,
    })
      .then((res) => setResponseData(res))
      .catch((data) => setResponseData(data));
  }, []);

  const variablesObject = useMemo(() => {
    return Object.fromEntries(variables);
  }, [variables]);

  const [queryUrl, setQueryUrl] = useState(encodeVariables(initialUrl || '', variablesObject));
  const [headers, setHeaders] = useState<IPair[]>(
    initialHeaders ? JSON.parse(encodeVariables(initialHeaders, variablesObject)) : []
  );
  const [body, setBody] = useState(
    initialBody ? encodeVariables(initialBody, variablesObject) : ''
  );

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const replacedUrl = replaceVariables(queryUrl, variablesObject);
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

  const isDisabled = !Boolean(queryUrl);

  return (
    <>
      <form className="flex gap-1" onSubmit={handleSubmit}>
        <SelectMethod name="select" value={method} onValueChange={setMethod} />
        <HighlightedUrl
          name="url-input"
          value={queryUrl}
          onChange={(e) => setQueryUrl(e.target.value.trimStart())}
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
          <CodeGenerator request={{ method, url: queryUrl, headers, body }} />
        </AccordionWrapper>
      </section>
      {responseData && (
        <AccordionWrapper title={t('rest-client.titles.response')} collapsed={false}>
          <HighlighterResponse
            responseBody={responseData.body}
            responseStatus={responseData.status}
          />
        </AccordionWrapper>
      )}
    </>
  );
}
