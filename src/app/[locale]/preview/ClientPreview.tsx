'use client';

import { useState } from 'react';

import { PairsEditor } from '@/components';
import { VariableEditor } from '@/components/variable-editor/VariableEditor';
import { IPair } from '@/interfaces';

export const ClientPreview = () => {
  const [headers, setHeaders] = useState<IPair[]>([['ContentType', 'Application/json']]);

  return (
    <div>
      <PairsEditor pairs={headers} onPairsChange={setHeaders} />
      <VariableEditor />
    </div>
  );
};
