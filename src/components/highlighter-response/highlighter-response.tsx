'use client';
import { Sun, CloudOff } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useState } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark, atomOneLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';

import { Button, Text } from '@/components';

interface Props {
  responseBody: unknown;
  responseStatus: number;
}

export const HighlighterResponse = ({ responseBody, responseStatus }: Props) => {
  const { theme } = useTheme();
  const [isPrettify, setPrettify] = useState(true);
  const [value, setValue] = useState(
    isPrettify ? JSON.stringify(responseBody, null, 2) : JSON.stringify(responseBody)
  );

  const handlePrettify = () => {
    setPrettify((pret) => {
      setValue((oldValue) =>
        pret ? JSON.stringify(JSON.parse(oldValue)) : JSON.stringify(JSON.parse(oldValue), null, 2)
      );
      return !pret;
    });
  };

  const statusColors: Record<number, string> = {
    1: 'text-blue-500',
    2: 'text-green-500',
    3: 'text-yellow-500',
    4: 'text-orange-500',
    5: 'text-red-500',
  };
  const firstDigit = Math.floor(responseStatus / 100);
  const statusColor = statusColors[firstDigit] || 'text-gray-500';

  return (
    <div className="flex p-2 flex-col border-2 border-destructive rounded-2xl">
      <div className="flex gap-4">
        <Text as={'h3'} variant={'block-title'}>
          Response
        </Text>
        <Button variant={'secondary'} onClick={handlePrettify}>
          {isPrettify ? <Sun /> : <CloudOff />}
        </Button>
      </div>
      <div className="flex gap-2">
        <Text size="xs">Status:</Text>
        <Text className={statusColor} size="xs">
          {responseStatus}
        </Text>
      </div>
      <div className="border-2 rounded-2xl overflow-hidden">
        <SyntaxHighlighter language="json" style={theme === 'dark' ? atomOneDark : atomOneLight}>
          {value}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};
