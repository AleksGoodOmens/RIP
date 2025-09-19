'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

import { PairsEditor } from '@/components';
import { IPair } from '@/interfaces';

export default function VariablesClient() {
  const [variables, setVariables] = useState<IPair[]>(() =>
    JSON.parse(localStorage.getItem('variablesRIP') || '[]')
  );

  const t = useTranslations();

  useEffect(() => {
    localStorage.setItem('variablesRIP', JSON.stringify(variables));
  }, [variables]);
  return (
    <PairsEditor
      pairs={variables}
      onPairsChange={setVariables}
      label={t('variables.label')}
      messages={{
        deleted: t('toasts.variables.deleted'),
        updated: t('toasts.variables.updated'),
        added: t('toasts.variables.added'),
      }}
    />
  );
}
