import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type FormActionResult =
  | { success: true }
  | { success: false; fieldErrors: Record<string, string> };

export const extractVariables = (input: string): string[] => {
  const matches: string[] = [];
  const regex = /{{(.*?)}}/g;
  let match;

  while ((match = regex.exec(input)) !== null) {
    matches.push(match[1]);
    const nested = extractVariables(match[1]);
    matches.push(...nested);
  }

  return matches;
};

export const replaceVariables = (input: string, variables: Record<string, string>): string => {
  let result = input;
  let iterations = 0;

  while (iterations++ < 10 && /{{(.*?)}}/.test(result)) {
    result = result.replace(/{{(.*?)}}/g, (_, key) => {
      return variables[key] ?? `{{${key}}}`;
    });
  }

  return result;
};
