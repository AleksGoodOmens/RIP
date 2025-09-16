'use client';
import { ArrowDownToLine, ArrowBigDownDash, ArrowBigUpDash } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

import { Pair, Text } from '@/components';
import { IPair } from '@/interfaces';
import { cn } from '@/lib/utils';

import { Button } from '../ui';

interface PairsEditorProps {
  title: string;
  pairs: IPair[];
  variables?: Record<string, string>;
  onPairsChange: (pairs: IPair[]) => void;
  onAddPair?: () => void;
  onRemovePair?: (index: number) => void;
  onUpdatePair?: (newPair: IPair, index: number) => void;
}

export const PairsEditor = ({
  title,
  pairs,
  variables,
  onPairsChange,
  onAddPair,
  onRemovePair,
  onUpdatePair,
}: PairsEditorProps) => {
  const [localPairs, setLocalPairs] = useState<IPair[]>(pairs);
  const [isHided, setIsHided] = useState(false);

  useEffect(() => {
    setLocalPairs(pairs);
  }, [pairs]);

  const isAddDisabled =
    localPairs.length > 0 &&
    localPairs[localPairs.length - 1][0] === '' &&
    localPairs[localPairs.length - 1][1] === '';

  const handleAddEmptyPair = useCallback(() => {
    const newPairs: IPair[] = [...localPairs, ['', '']];
    setLocalPairs(newPairs);
    onPairsChange(newPairs);
    onAddPair?.();
  }, [localPairs, onPairsChange, onAddPair]);

  const handleRemovePair = useCallback(
    (index: number) => {
      const newPairs = localPairs.filter((_, i) => i !== index);
      setLocalPairs(newPairs);
      onPairsChange(newPairs);
      onRemovePair?.(index);
    },
    [localPairs, onPairsChange, onRemovePair]
  );

  const handleUpdatePair = useCallback(
    (newPair: IPair, index: number) => {
      const newPairs = localPairs.map((pair, i) => (i === index ? newPair : pair));
      setLocalPairs(newPairs);
      onPairsChange(newPairs);
      onUpdatePair?.(newPair, index);
    },
    [localPairs, onPairsChange, onUpdatePair]
  );

  const handleShow = () => {
    setIsHided((prev) => !prev);
  };

  return (
    <section
      className={cn(
        'p-4 border-2 border-destructive rounded-2xl',
        'grid transition-all duration-300',
        isHided ? 'grid-rows-[0fr]' : 'grid-rows-[1fr]'
      )}
    >
      <div className="min-h-9 overflow-hidden">
        <header className="flex gap-4 mb-4">
          <Text as="h3" variant="block-title">
            {title}
          </Text>
          <Button
            variant={isAddDisabled ? 'outline' : 'default'}
            onClick={handleAddEmptyPair}
            disabled={isAddDisabled}
          >
            <ArrowDownToLine />
          </Button>
          <Button variant={isAddDisabled ? 'outline' : 'default'} onClick={handleShow}>
            {isHided ? <ArrowBigDownDash /> : <ArrowBigUpDash />}
          </Button>
        </header>
        <ul>
          {localPairs.map((pair, i) => (
            <Pair
              key={`${i}+${pair[0]}+${pair[1]}`}
              index={i}
              pair={pair}
              variables={variables ?? {}}
              handleRemovePair={handleRemovePair}
              handleUpdatePair={handleUpdatePair}
            />
          ))}
        </ul>
      </div>
    </section>
  );
};
