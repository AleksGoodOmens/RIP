'use client';
import { TypeOutline, Braces } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useState } from 'react';
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
  const [value, setValue] = useState(
    isPrettify ? JSON.stringify(responseBody, null, 2) : JSON.stringify(responseBody)
  );

  const handlePrettify = () => {
    setPrettify((pret) => {
      setValue((oldValue) => {
        const ugly = JSON.stringify(JSON.parse(oldValue));
        const pretty = JSON.stringify(JSON.parse(oldValue), null, 2);
        return pret ? ugly : pretty;
      });
      return !pret;
    });
  };

  const firstDigit = Math.floor(responseStatus / 100);
  const statusColor = statusColors[firstDigit] || 'text-gray-500';

  return (
    <div>
      <header className="flex gap-4">
        <Button aria-label="make code pretty" variant={'secondary'} onClick={handlePrettify}>
          {isPrettify ? <Braces /> : <TypeOutline />}
        </Button>
      </header>
      <div className="flex gap-2">
        <Text size="xs">Status:</Text>
        <Text className={statusColor} size="xs">
          {responseStatus}
        </Text>
      </div>
      <div className="border-2 rounded-2xl overflow-hidden text-xs">
        <SyntaxHighlighter
          showLineNumbers
          language="json"
          style={theme === 'dark' ? atomDark : oneLight}
          customStyle={{ margin: '0' }}
        >
          {value}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};
