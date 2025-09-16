'use client';

import { useState } from 'react';

import { Input } from '@/components/ui';

import { HighlightVariables } from '../highlight-variables/HighlightVariables';

interface VariableTesterProps {
  variables: Record<string, string>;
  initial?: string;
}

const replaceVariables = (input: string, variables: Record<string, string>) => {
  return input.replace(/{{(.*?)}}/g, (_, key) => variables[key] ?? `{{${key}}}`);
};

export const VariableTester = ({ variables, initial = '' }: VariableTesterProps) => {
  const [input, setInput] = useState(initial);

  return (
    <section className="mt-6 p-4 border rounded-xl space-y-2">
      <label className="block font-semibold">Test line with variables</label>
      <Input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Например: GET {{baseUrl}}/users/{{userId}}"
      />

      <div className="text-sm text-muted-foreground">
        <span className="block mb-1 font-medium">Подсветка:</span>
        <HighlightVariables input={input} variables={variables} />
      </div>

      <div className="text-sm text-green-700 font-mono">
        <span className="block mb-1 font-medium">Result:</span>
        {replaceVariables(input, variables)}
      </div>
    </section>
  );
};
