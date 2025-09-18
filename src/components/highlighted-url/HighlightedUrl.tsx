import { ChangeEvent } from 'react';

import { HighlightVariables } from '../highlight-variables/HighlightVariables';

interface Props {
  value: string;
  variables: Record<string, string>;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  name?: string;
}

export const HighlightedUrl = ({ value, variables, onChange }: Props) => {
  return (
    <label className="relative w-full h-full">
      <input
        type="text"
        value={value}
        onChange={onChange}
        className="absolute top-0 left-0 font-light"
      />
      <HighlightVariables input={value} variables={variables} />
    </label>
  );
};
