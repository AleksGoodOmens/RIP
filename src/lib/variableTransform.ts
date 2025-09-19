import { IPair } from '@/interfaces';

export const replaceVariables = (input: string, variables: Record<string, string>): string => {
  return input.replace(/{{(.*?)}}/g, (_, key) => variables[key] ?? `{{${key}}}`);
};

export const replaceVariablesInPair = (pair: IPair, variables: Record<string, string>): IPair => {
  const key = pair[0];
  const value = pair[1];

  return [key, value ? replaceVariables(value, variables) : ''];
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
