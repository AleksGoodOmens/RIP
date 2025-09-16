'use client';

import { Trash2, Pencil, Save } from 'lucide-react';
import { memo, useCallback, useState } from 'react';

import { IPair } from '@/interfaces';
import { cn } from '@/lib/utils';

import { HighlightVariables } from '../highlight-variables/HighlightVariables';
import { Button, Input } from '../ui';

interface PairProps {
  pair: IPair;
  index: number;
  variables: Record<string, string>;
  handleRemovePair: (index: number) => void;
  handleUpdatePair: (newPair: IPair, index: number) => void;
}

export const Pair = memo(
  ({ pair, handleRemovePair, handleUpdatePair, variables, index }: PairProps) => {
    const [key, setKey] = useState(pair[0]);
    const [value, setValue] = useState(pair[1]);
    const [isEditable, setIsEditable] = useState(pair[0] === '');

    const handleRemove = useCallback(() => {
      handleRemovePair(index);
    }, [handleRemovePair, index]);

    const handleEditToggle = () => {
      const exitingEditMode = isEditable;
      setIsEditable(!isEditable);

      if (exitingEditMode) {
        const newPair: IPair = [key, value];
        if (newPair.toString() !== pair.toString()) {
          handleUpdatePair(newPair, index);
        }
      }
    };

    const handleKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setKey(e.target.value);
    };

    const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
    };

    return (
      <li className="flex gap-2 flex-wrap items-center rounded-xl">
        <div
          className={cn(
            'border-2 p-1 rounded-xl flex flex-col sm:flex-row items-center grow basis-40 shrink-0',
            !isEditable && 'bg-accent'
          )}
        >
          <Input
            className="p-2"
            type="text"
            name="key"
            value={key}
            onChange={handleKeyChange}
            placeholder="key"
            disabled={!isEditable}
          />
          {!isEditable && (
            <div className="text-xs px-2 pt-1 text-muted-foreground">
              <HighlightVariables input={key} variables={variables} />
            </div>
          )}

          <span className="px-1">:</span>

          <Input
            className="p-2"
            type="text"
            name="value"
            value={value}
            onChange={handleValueChange}
            placeholder="value"
            disabled={!isEditable}
          />
          {!isEditable && (
            <div className="text-xs px-2 pt-1 text-muted-foreground">
              <HighlightVariables input={value} variables={variables} />
            </div>
          )}
        </div>

        <div className="grid gap-1 sm:grid-cols-2">
          <Button variant="destructive" onClick={handleRemove}>
            <Trash2 />
          </Button>
          <Button onClick={handleEditToggle} variant={isEditable ? 'secondary' : 'default'}>
            {isEditable ? <Save /> : <Pencil />}
          </Button>
        </div>
      </li>
    );
  }
);

Pair.displayName = 'Pair';
