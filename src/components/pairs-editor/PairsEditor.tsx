'use client';
import { PlusIcon } from 'lucide-react';
import { useCallback } from 'react';

import { Pair } from '@/components';
import { IPair } from '@/interfaces';

import { Button } from '../ui';

interface PairsEditorProps {
  pairs: IPair[];
  onPairsChange: (pairs: IPair[]) => void;
  onAddPair?: () => void;
  onRemovePair?: (index: number) => void;
  onUpdatePair?: (newPair: IPair, index: number) => void;
  variables?: Record<string, string>;
}

export const PairsEditor = ({
  pairs,
  onPairsChange,
  onAddPair,
  onRemovePair,
  onUpdatePair,
}: PairsEditorProps) => {
  const isAddDisabled =
    pairs.length > 0 && pairs[pairs.length - 1][0] === '' && pairs[pairs.length - 1][1] === '';

  const handleAddEmptyPair = useCallback(() => {
    const newPairs: IPair[] = [...pairs, ['', ''] as IPair];
    onPairsChange(newPairs);
    onAddPair?.();
  }, [pairs, onPairsChange, onAddPair]);

  const handleRemovePair = useCallback(
    (index: number) => {
      const newPairs = pairs.filter((_, i) => i !== index);
      onPairsChange(newPairs);
      onRemovePair?.(index);
    },
    [pairs, onPairsChange, onRemovePair]
  );

  const handleUpdatePair = useCallback(
    (newPair: IPair, index: number) => {
      const newPairs = pairs.map((pair, i) => (i === index ? newPair : pair));
      onPairsChange(newPairs);
      onUpdatePair?.(newPair, index);
    },
    [pairs, onPairsChange, onUpdatePair]
  );

  return (
    <>
      <section className="mb-4">
        <Button
          aria-label="add"
          variant={isAddDisabled ? 'outline' : 'default'}
          onClick={handleAddEmptyPair}
          disabled={isAddDisabled}
        >
          <PlusIcon />
        </Button>
      </section>
      <ul>
        {pairs.map((header, i) => (
          <Pair
            handleRemovePair={handleRemovePair}
            handleUpdatePair={handleUpdatePair}
            pair={header}
            index={i}
            key={`${i}+${header[0]} + ${header[1]}`}
          />
        ))}
      </ul>
    </>
  );
};
