'use client';
import { Trash2, Pencil, Save } from 'lucide-react';
import { FocusEvent, memo, useCallback, useEffect, useRef, useState } from 'react';

import { IPair } from '@/interfaces';
import { cn } from '@/lib/utils';

import { Button, Input } from '../ui';

interface PairProps {
  pair: IPair;
  index: number;
  handleRemovePair: (index: number) => void;
  handleUpdatePair: (newPair: IPair, index: number) => void;
}

export const Pair = memo(({ pair, handleRemovePair, handleUpdatePair, index }: PairProps) => {
  const [key, setKey] = useState(pair[0]);
  const [value, setValue] = useState(pair[1]);
  const [isEditable, setIsEditable] = useState(pair[0] !== '');

  const timeoutRef = useRef<null | number>(null);

  const handleRemove = useCallback(() => {
    handleRemovePair(index);
  }, [handleRemovePair, index]);

  const handleOnChange = useCallback((e: FocusEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;

    if (e.currentTarget.name === 'key') setKey(value);
    if (e.currentTarget.name === 'value') setValue(value);
  }, []);

  const handleEdit = () => {
    setIsEditable((prev) => !prev);
  };

  useEffect(() => {
    if (!isEditable) return;

    if (pair.toString() === [key, value].toString()) return;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = window.setTimeout(() => {
      handleUpdatePair([key, value], index);
    }, 300);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [pair, isEditable, key, value, index, handleUpdatePair]);

  return (
    <li className={'flex gap-2 flex-wrap items-center rounded-xl'}>
      <div
        className={cn(
          'border-2 p-1 rounded-xl flex flex-col sm:flex-row items-center grow basis-40 shrink-0 ',
          !isEditable && 'bg-accent'
        )}
      >
        <Input
          className="p-2"
          type="text"
          name="key"
          value={key}
          onChange={handleOnChange}
          placeholder="key"
          disabled={isEditable}
        />
        <span className="px-1">:</span>
        <Input
          className="p-2"
          type="text"
          name="value"
          value={value}
          onChange={handleOnChange}
          placeholder="value"
          disabled={isEditable}
        />
      </div>
      <div className="grid gap-1 sm:grid-cols-2">
        <Button aria-label="delete" variant={'destructive'} onClick={handleRemove}>
          <Trash2 />
        </Button>
        <Button
          aria-label={isEditable ? 'edit' : 'save'}
          onClick={handleEdit}
          variant={isEditable ? 'secondary' : 'default'}
        >
          {isEditable ? <Pencil /> : <Save />}
        </Button>
      </div>
    </li>
  );
});

Pair.displayName = 'Pair';
