'use client';

import { getAuth } from 'firebase/auth';
import { useEffect, useState } from 'react';

import { fetchVariables, saveVariables } from '@/app/api/variables/variables';
import { IPair } from '@/interfaces';

type Status = 'idle' | 'loading' | 'error' | 'saved';

export const useVariablePairs = () => {
  const [variablePairs, setVariablePairs] = useState<IPair[]>([]);
  const [status, setStatus] = useState<Status>('idle');

  const uid = getAuth().currentUser?.uid;

  useEffect(() => {
    if (!uid) return;

    const load = async () => {
      setStatus('loading');
      try {
        const data = await fetchVariables(uid);
        const filtered = Object.entries(data).filter(
          ([key, value]) => key.trim() && typeof value === 'string' && value.trim()
        );
        setVariablePairs(filtered);
        setStatus('idle');
      } catch (err) {
        console.error('Failed to fetch variables:', err);
        setStatus('error');
      }
    };

    void load();
  }, [uid]);

  const updatePair = async (newPair: IPair, index: number) => {
    const updated = variablePairs.map((p, i) => (i === index ? newPair : p));
    setVariablePairs(updated);
    await syncToServer(updated);
  };

  const removePair = async (index: number) => {
    const updated = variablePairs.filter((_, i) => i !== index);
    setVariablePairs(updated);
    await syncToServer(updated);
  };

  const syncToServer = async (pairs: IPair[]) => {
    const valid = pairs.filter(([k, v]) => k.trim() && typeof v === 'string' && v.trim());
    setStatus('loading');

    try {
      await saveVariables(uid!, Object.fromEntries(valid));
      setStatus('saved');
      setTimeout(() => setStatus('idle'), 1500);
    } catch (err) {
      console.error('Failed to save variables:', err);
      setStatus('error');
    }
  };

  const variableMap: Record<string, string> = Object.fromEntries(
    variablePairs.filter(([k, v]) => k.trim() && typeof v === 'string' && v.trim())
  );

  return {
    variablePairs,
    setVariablePairs,
    updatePair,
    removePair,
    variableMap,
    status,
  };
};
