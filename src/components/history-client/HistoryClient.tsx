'use client';

import { useEffect, useMemo, useState } from 'react';

import { HistoryEmpty, HistoryFull } from '@/components';
import { auth } from '@/firebase/firebase';
import { HistoryItem } from '@/interfaces';

export const HistoryClient = () => {
  const [list, setList] = useState<HistoryItem[]>([]);

  const uid = auth.currentUser?.uid;
  useEffect(() => {
    fetch(`/api/history?uid=${uid}`)
      .then((res) => res.json())
      .then((items) => setList(items))
      .catch((err) => setList(err));
  }, [uid]);

  const sortedItems = useMemo(() => {
    return [...list].sort(
      (a, b) => new Date(b.metrics.timestamp).getTime() - new Date(a.metrics.timestamp).getTime()
    );
  }, [list]);

  return (
    <section>
      {!list.length && <HistoryEmpty />}
      {list.length && <HistoryFull history={sortedItems} />}
    </section>
  );
};
