import { PairsEditor } from '@/components';
import { VariableTester } from '@/components/variable-tester/VariableTester';
import { useVariablePairs } from '@/utils/hooks/useVariablePairs';

const VariableEditor = () => {
  const { variablePairs, setVariablePairs, updatePair, removePair, variableMap, status } =
    useVariablePairs();

  return (
    <>
      <PairsEditor
        pairs={variablePairs}
        onPairsChange={setVariablePairs}
        onUpdatePair={updatePair}
        onRemovePair={removePair}
        variables={variableMap}
      />
      <VariableTester variables={variableMap} />
      {status === 'loading' && <p className="text-muted-foreground">⏳ Loading…</p>}
      {status === 'saved' && <p className="text-green-600">✅ Saved</p>}
      {status === 'error' && <p className="text-red-600">❌ Failed to save</p>}
    </>
  );
};

export { VariableEditor };
