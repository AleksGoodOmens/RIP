interface HighlightVariablesProps {
  input: string;
  variables: Record<string, string>;
}

const HighlightVariables = ({ input, variables }: HighlightVariablesProps) => {
  const parts = input.split(/({{.*?}})/g);

  return (
    <div className="absolute top-0 left-0 -z-1 border-1 border-red-400">
      {parts.map((part, i) => {
        const match = part.match(/{{(.*?)}}/);
        if (!match) return part;

        const key = match[1];
        const exists = key in variables;

        const colorClass = exists ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';

        return (
          <span key={i} className={`${colorClass}`}>
            {part}
          </span>
        );
      })}
    </div>
  );
};

export { HighlightVariables };
