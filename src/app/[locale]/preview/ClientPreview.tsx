'use client';

import { getAuth } from 'firebase/auth';
import { useEffect, useState } from 'react';

import { PairsEditor } from '@/components';
import { VariableTester } from '@/components/variable-tester/VariableTester';
import { IPair } from '@/interfaces';
import { useVariables } from '@/utils/hooks/useVariables';

export const ClientPreview = () => {
  const [headers, setHeaders] = useState<IPair[]>([['ContentType', 'Application/json']]);
  const [variablePairs, setVariablePairs] = useState<IPair[]>([]);

  const uid = getAuth().currentUser?.uid;
  const { variables, updateVariables, status } = useVariables(uid);

  useEffect(() => {
    const filtered = Object.entries(variables).filter(
      ([key, value]) =>
        key.trim() !== '' && value !== undefined && value !== '' && typeof value === 'string'
    );
    setVariablePairs(filtered);
  }, [variables]);

  const variableMap: Record<string, string> = Object.fromEntries(
    variablePairs.filter(
      ([key, value]) =>
        key.trim() !== '' && value !== undefined && value !== '' && typeof value === 'string'
    )
  );

  return (
    <div>
      <PairsEditor title="Headers" pairs={headers} onPairsChange={setHeaders} />
      <PairsEditor
        title="Variables"
        pairs={variablePairs}
        onPairsChange={setVariablePairs}
        onUpdatePair={(newPair, index) => {
          const updatedPairs = variablePairs.map((pair, i) => (i === index ? newPair : pair));
          setVariablePairs(updatedPairs);

          const filtered = updatedPairs.filter(
            ([key, value]) =>
              key.trim() !== '' && value !== undefined && value !== '' && typeof value === 'string'
          );

          void updateVariables(Object.fromEntries(filtered));
        }}
        onRemovePair={(index) => {
          const updatedPairs = variablePairs.filter((_, i) => i !== index);
          setVariablePairs(updatedPairs);

          const filtered = updatedPairs.filter(
            ([key, value]) =>
              key.trim() !== '' && value !== undefined && value !== '' && typeof value === 'string'
          );
          void updateVariables(Object.fromEntries(filtered), { overwrite: true });
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
