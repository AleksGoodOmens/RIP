'use client';
import { PlusIcon } from 'lucide-react';
import { useCallback } from 'react';
import { toast } from 'react-toastify';

import { Pair, Text } from '@/components';
import { IPair } from '@/interfaces';

import { Button } from '../ui';

interface PairsEditorProps {
  pairs: IPair[];
  label?: string;
  onPairsChange: (pairs: IPair[]) => void;
  onAddPair?: () => void;
  onRemovePair?: (index: number) => void;
  onUpdatePair?: (newPair: IPair, index: number) => void;
  variables?: Record<string, string>;
  messages: {
    deleted: string;
    updated: string;
    added: string;
  };
}

export const PairsEditor = ({
  pairs,
  label,
  onPairsChange,
  onAddPair,
  onRemovePair,
  onUpdatePair,
  messages,
}: PairsEditorProps) => {
  const isAddDisabled =
    pairs.length > 0 && pairs[pairs.length - 1][0] === '' && pairs[pairs.length - 1][1] === '';

  const handleAddEmptyPair = useCallback(() => {
    const newPairs: IPair[] = [...pairs, ['', ''] as IPair];
    onPairsChange(newPairs);
    onAddPair?.();
    toast.info(messages.added);
  }, [pairs, onPairsChange, onAddPair, messages.added]);

  const handleRemovePair = useCallback(
    (index: number) => {
      const newPairs = pairs.filter((_, i) => i !== index);
      onPairsChange(newPairs);
      onRemovePair?.(index);
      toast.info(messages.deleted);
    },
    [pairs, onPairsChange, onRemovePair, messages.deleted]
  );

  const handleUpdatePair = useCallback(
    (newPair: IPair, index: number) => {
      const newPairs = pairs.map((pair, i) => (i === index ? newPair : pair));
      onPairsChange(newPairs);
      onUpdatePair?.(newPair, index);
      toast.info(messages.updated);
    },
    [pairs, onPairsChange, onUpdatePair, messages.updated]
  );

  return (
    <>
      <section className="mb-4 flex items-center gap-4">
        {label && (
          <Text as={'h2'} className="capitalize">
            {label}
          </Text>
        )}
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
