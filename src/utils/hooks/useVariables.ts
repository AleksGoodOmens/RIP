'use client';

import { useEffect, useState } from 'react';

type Status = 'idle' | 'loading' | 'error' | 'saved';

export const useVariables = (uid?: string) => {
  const [variables, setVariables] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>('idle');

  useEffect(() => {
    if (!uid) return;

    const loadVariables = async () => {
      setStatus('loading');

      try {
        const res = await fetch(`/api/variables?uid=${uid}`);
        if (!res.ok) throw new Error(`Failed to load variables: ${res.status}`);
        const data = await res.json();
        setVariables(data);
        setStatus('idle');
      } catch (err) {
        console.error('Variable load failed:', err);
        setStatus('error');
      }
    };

    void loadVariables();
  }, [uid]);

  const updateVariables = async (newVars: Record<string, string>) => {
    setVariables(newVars);
    setStatus('loading');

    try {
      const res = await fetch(`/api/variables?uid=${uid}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newVars),
      });

      if (!res.ok) throw new Error(`Failed to save variables: ${res.status}`);
      setStatus('saved');
      setTimeout(() => setStatus('idle'), 1500);
    } catch (err) {
      console.error('Variable update failed:', err);
      setStatus('error');
    }
  };

  return { variables, updateVariables, status };
};
