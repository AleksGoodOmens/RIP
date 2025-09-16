export const replaceVariables = (input: string, variables: Record<string, string>): string => {
  return input.replace(/{{(.*?)}}/g, (_, key) => variables[key] ?? `{{${key}}}`);
};

export const encodeVariables = (input: string, variables: Record<string, string>): string => {
  let result = input;

  for (const [key, value] of Object.entries(variables)) {
    const escaped = value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(escaped, 'g');
    result = result.replace(regex, `{{${key}}}`);
  }

  return result;
};
