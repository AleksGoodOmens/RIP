'use client';
import { useTheme } from 'next-themes';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark, atomOneLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';

import { Text } from '@/components';

interface Props {
  responseBody: string;
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

  const firstDigit = Math.floor(responseStatus / 100);
  const statusColor = statusColors[firstDigit] || 'text-gray-500';

  return (
    <div className="flex p-2 flex-col border-2 border-red-200 rounded-2xl">
      <Text as={'h3'} variant={'block-title'}>
        Response
      </Text>
      <div className="flex gap-2">
        <Text size="xs">Status:</Text>
        <Text className={statusColor} size="xs">
          {responseStatus}
        </Text>
      </div>
      <SyntaxHighlighter language="json" style={theme === 'dark' ? atomOneDark : atomOneLight}>
        {responseBody}
      </SyntaxHighlighter>
    </div>
  );
};
