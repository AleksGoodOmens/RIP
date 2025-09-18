import { cn } from '@/lib/utils';

interface HighlightVariablesProps {
  input: string;
  variables: Record<string, string>;
}

const HighlightVariables = ({ input, variables }: HighlightVariablesProps) => {
  const parts = input.split(/({{.*?}})/g);

  return (
    <>
      {parts.map((part, i) => {
        const match = part.match(/{{(.*?)}}/);
        if (!match) return part;

        const key = match[1];
        const exists = key in variables;

        return (
          <span key={i} className={cn(exists ? ' text-green-800' : 'text-destructive')}>
            {part}
          </span>
        );
      })}
    </>
  );
};

export { HighlightVariables };
