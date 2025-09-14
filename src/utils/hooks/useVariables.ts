'use client';

import { useEffect, useState } from 'react';

export const useVariables = (uid?: string) => {
  const [variables, setVariables] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!uid) return;

    const loadVariables = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`/api/variables?uid=${uid}`);
        if (!res.ok) throw new Error(`Failed to load variables: ${res.status}`);
        const data = await res.json();
        setVariables(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setLoading(false);
      }
    };

    void loadVariables();
  }, [uid]);

  const updateVariables = async (newVars: Record<string, string>) => {
    setVariables(newVars);

    try {
      const res = await fetch(`/api/variables?uid=${uid}`, {
        method: 'POST',
        body: JSON.stringify(newVars),
      });

      if (!res.ok) throw new Error(`Failed to save variables: ${res.status}`);
    } catch (err) {
      console.error('Variable update failed:', err);
    }
  };

  return { variables, updateVariables, loading, error };
};
