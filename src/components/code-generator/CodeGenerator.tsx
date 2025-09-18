'use client';
import { HTTPSnippet, TargetId } from 'httpsnippet-lite';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import React, { useState, useEffect } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark, atomOneLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';

import { IRequestSnippetGenerator } from '@/interfaces';
import { generateHarRequest } from '@/lib/utils';

import { Text } from '../text/Text';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface Props {
  request: IRequestSnippetGenerator;
}

interface language {
  id: TargetId;
  name: string;
  client?: string;
}

const languages: language[] = [
  { id: 'shell', name: 'cURL/shell' },
  { id: 'powershell', name: 'cURL/powershell' },
  { id: 'javascript', name: 'JavaScript (fetch api)', client: 'fetch' },
  { id: 'javascript', name: 'JavaScript (XHR)' },
  { id: 'node', name: 'node' },
  { id: 'node', name: 'node (fetch)', client: 'fetch' },
  { id: 'node', name: 'node (axios)', client: 'axios' },
  { id: 'ruby', name: 'Ruby' },
  { id: 'python', name: 'Python' },
  { id: 'java', name: 'Java' },
  { id: 'php', name: 'PHP' },
  { id: 'go', name: 'Go' },
  { id: 'csharp', name: 'C#' },
];

export const CodeGenerator = ({ request }: Props) => {
  const [snippet, setSnippet] = useState<string | null>(null);
  const [language, setLanguage] = useState<language>({
    id: 'javascript',
    name: 'JavaScript (fetch api)',
    client: 'fetch',
  });
  const [error, setError] = useState<string | null>(null);

  const { theme } = useTheme();
  const t = useTranslations('code-generator');

  useEffect(() => {
    const generateSnippet = async () => {
      if (!request.url) {
        return;
      }

      try {
        const harRequest = generateHarRequest(request);

        const snippet = new HTTPSnippet(harRequest);
        const target = language.id;
        const client = language.client;

        const output = await snippet.convert(target, client);
        setSnippet(output as string);
      } catch (err) {
        if (err instanceof Error) setError(`${t('messages.error')}: ${err.message}`);
      }
    };

    generateSnippet().catch((error) => {
      setError(`${t('messages.error')}: ${error.message}`);
    });
  }, [request, language, t]);

  const handleChangeLanguage = (value: string) => {
    const selectedLanguage = languages.find((lang) => lang.name === value) || languages[3];
    setLanguage(selectedLanguage);
  };

  return (
    <>
      <section className="flex gap-4 items-center mb-4">
        <Select value={language.name} onValueChange={handleChangeLanguage}>
          <SelectTrigger aria-label="snippet language" className="w-48">
            <SelectValue placeholder={language.id} />
          </SelectTrigger>
          <SelectContent aria-label="select snippet language">
            {languages.map((lang) => (
              <SelectItem key={lang.name} value={lang.name}>
                {lang.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </section>
      {error && <Text className="text-destructive">{error}</Text>}

      {!snippet && (
        <Text align={'center'} size={'xs'} className="capitalize">
          {t('messages.default')}
        </Text>
      )}
      {snippet && (
        <div className="rounded-2xl overflow-hidden text-xs">
          <SyntaxHighlighter
            showLineNumbers
            customStyle={{ padding: '1rem' }}
            style={theme === 'dark' ? atomOneDark : atomOneLight}
            language={language.id}
          >
            {snippet}
          </SyntaxHighlighter>
        </div>
      )}
    </>
  );
};
