'use client';
import { TypeOutline, Braces } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useState, useMemo } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';

import { Button, Text } from '@/components';

interface Props {
  responseBody: unknown;
  responseStatus: number;
}

const statusColors: Record<number, string> = {
  1: 'text-chart-3',
  2: 'text-chart-2',
  3: 'text-chart-4',
  4: 'text-chart-5',
  5: 'text-chart-1',
};

export const HighlighterResponse = ({ responseBody, responseStatus }: Props) => {
  const { theme } = useTheme();
  const [isPrettify, setPrettify] = useState(true);

  const isStringResponse = typeof responseBody === 'string';

  const formattedValue = useMemo(() => {
    if (isStringResponse) {
      return responseBody;
    } else {
      try {
        return isPrettify ? JSON.stringify(responseBody, null, 2) : JSON.stringify(responseBody);
      } catch {
        return String(responseBody);
      }
    }
  }, [responseBody, isPrettify, isStringResponse]);

  const handlePrettify = () => {
    if (isStringResponse) return;
    setPrettify((prev) => !prev);
  };

  const firstDigit = Math.floor(responseStatus / 100);
  const statusColor = statusColors[firstDigit] || 'text-var(--muted)';

  return (
    <div>
      <header className="flex gap-4 items-center mb-4">
        <div className="flex gap-2">
          <Text size="xs">Status:</Text>
          <Text className={statusColor} size="xs">
            {responseStatus}
          </Text>
        </div>
        {!isStringResponse && (
          <Button aria-label="make code pretty" variant={'secondary'} onClick={handlePrettify}>
            {isPrettify ? <Braces /> : <TypeOutline />}
          </Button>
        )}
      </header>
      <div className="border-2 rounded-2xl overflow-hidden text-xs">
        <SyntaxHighlighter
          showLineNumbers
          language={isStringResponse ? 'text' : 'json'}
          style={theme === 'dark' ? atomDark : oneLight}
          customStyle={{ margin: '0' }}
        >
          {formattedValue}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};
