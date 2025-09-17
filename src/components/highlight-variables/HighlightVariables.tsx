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

        const baseClass = 'font-mono px-1 rounded';
        const colorClass = exists ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';

        return (
          <span key={i} className={`${baseClass} ${colorClass}`}>
            {part}
          </span>
        );
      })}
    </>
  );
};

export { HighlightVariables };
