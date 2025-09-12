'use client';
import { ArrowDownToLine, ArrowBigDownDash, ArrowBigUpDash } from 'lucide-react';
import { useCallback, useState } from 'react';

import { Pair, Text } from '@/components';
import { IPair } from '@/interfaces';
import { cn } from '@/lib/utils';

import { Button } from '../ui';

interface PairsEditorProps {
  title: string;
  pairs: IPair[];
  onPairsChange: (pairs: IPair[]) => void;
  onAddPair?: () => void;
  onRemovePair?: (index: number) => void;
  onUpdatePair?: (newPair: IPair, index: number) => void;
}

export const PairsEditor = ({
  title,
  pairs,
  onPairsChange,
  onAddPair,
  onRemovePair,
  onUpdatePair,
}: PairsEditorProps) => {
  const [isHided, setIsHided] = useState(false);
  const isAddDisabled =
    pairs.length > 0 && pairs[pairs.length - 1][0] === '' && pairs[pairs.length - 1][1] === '';

  const handleAddEmptyPair = useCallback(() => {
    const newPairs: IPair[] = [...pairs, ['', ''] as IPair];
    setIsHided(false);
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
          <Text as={'h3'} variant={'block-title'}>
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
      </div>
    </section>
  );
};
