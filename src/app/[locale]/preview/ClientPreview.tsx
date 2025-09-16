'use client';

import { getAuth } from 'firebase/auth';
import { useState } from 'react';

import { PairsEditor } from '@/components';
import { VariableTester } from '@/components/variable-tester/VariableTester';
import { IPair } from '@/interfaces';
import { useVariables } from '@/utils/hooks/useVariables';

export const ClientPreview = () => {
  const [headers, setHeaders] = useState<IPair[]>([['ContentType', 'Application/json']]);
  const uid = getAuth().currentUser?.uid;

  const { variables, updateVariables, status } = useVariables(uid);
  const variablePairs: IPair[] = Object.entries(variables);
  const variableMap: Record<string, string> = Object.fromEntries(variablePairs);

  return (
    <div>
      <PairsEditor title="Headers" pairs={headers} onPairsChange={setHeaders} />
      <PairsEditor
        title="Variables"
        pairs={variablePairs}
        onPairsChange={async (pairs) => {
          await updateVariables(Object.fromEntries(pairs));
        }}
        variables={variableMap}
      />
      {status === 'loading' && <p className="text-muted-foreground">⏳ Loading…</p>}
      {status === 'saved' && <p className="text-green-600">✅ Saved</p>}
      {status === 'error' && <p className="text-red-600">❌ Failed to save</p>}
      <VariableTester variables={variableMap} />
    </div>
  );
};
