'use client';

import { useState } from 'react';

import { Input } from '@/components/ui';
import { replaceVariables, encodeVariables } from '@/lib/variableTransform';

import { HighlightVariables } from '../highlight-variables/HighlightVariables';

interface VariableTesterProps {
  variables: Record<string, string>;
  initial?: string;
}

export const VariableTester = ({ variables, initial = '' }: VariableTesterProps) => {
  const [input, setInput] = useState(initial);

  const decoded = replaceVariables(input, variables);
  const encoded = encodeVariables(decoded, variables);

  return (
    <section className="mt-6 p-4 border rounded-xl space-y-4 bg-card text-foreground">
      <label className="block font-semibold text-sm">Test line with variables</label>

      <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center bg-accent p-3 rounded-md">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Example: {{baseUrl}}/users/{{userId}}"
          className="font-mono text-sm"
        />
      </div>

      <div className="text-sm space-y-1">
        <span className="block font-medium text-muted-foreground">Highlight:</span>
        <div className="text-muted-foreground text-sm">
          <HighlightVariables input={input} variables={variables} />
        </div>
      </div>

      <div className="text-sm space-y-1">
        <span className="block font-medium text-primary">Decoded:</span>
        <div className="bg-card border p-2 rounded-md font-mono break-words text-muted-foreground">
          {decoded}
        </div>
      </div>

      <div className="text-sm space-y-1">
        <span className="block font-medium text-primary">Encoded:</span>
        <div className="bg-card border p-2 rounded-md font-mono break-words text-muted-foreground">
          {encoded}
        </div>
      </div>
    </section>
  );
};
