'use client';

import { useState } from 'react';

import { PairsEditor } from '@/components';
import { IPair } from '@/interfaces';

export const ClientPreview = () => {
  const [headers, setHeaders] = useState<IPair[]>([['ContentType', 'Application/json']]);
  const [variables, setVariables] = useState<IPair[]>([
    ['baseUrl', 'https://jsonplaceholder.typicode.com'],
  ]);

  return (
    <div>
      <PairsEditor title="Headers" pairs={headers} onPairsChange={(pairs) => setHeaders(pairs)} />
      <PairsEditor
        title="Variables"
        pairs={variables}
        onPairsChange={(pairs) => setVariables(pairs)}
      />
    </div>
  );
};
