'use client';

import { useEffect, useState } from 'react';

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
      .catch((err) => console.log(err));
  }, [uid]);

  return (
    <section>
      {!list.length && <HistoryEmpty />}
      {list.length && <HistoryFull history={list} />}
    </section>
  );
};
