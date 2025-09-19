import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { IPair, IRequestSnippetGenerator } from '@/interfaces';

import { replaceVariables } from './variableTransform';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type FormActionResult =
  | { success: true }
  | { success: false; fieldErrors: Record<string, string> };

export const encodeTo64 = (value: string): string => {
  return encodeURIComponent(btoa(value));
};

export const decodeToString = (value: string): string => {
  return atob(decodeURIComponent(value));
};

export const generateHarRequest = (request: IRequestSnippetGenerator) => {
  return {
    method: request.method.toUpperCase(),
    url: request.url,
    httpVersion: 'HTTP/1.1',
    cookies: [],
    headers: request.headers.map(([name, value]) => ({
      name,
      value,
    })),
    queryString: [],
    headersSize: -1,
    bodySize: -1,
    postData: request.body
      ? {
          mimeType: 'application/json',
          text: request.body,
          params: [],
        }
      : undefined,
  };
};

export const isValidJSON = (str: string) => {
  try {
    JSON.parse(str);
    return true;
  } catch {
    return false;
  }
};
export function replaceVariablesInBody(body: unknown, variables: Record<string, string>): unknown {
  if (typeof body === 'string') {
    return replaceVariables(body, variables);
  } else if (Array.isArray(body)) {
    return body.map((item) => replaceVariablesInBody(item, variables));
  } else if (typeof body === 'object' && body !== null) {
    const result: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(body)) {
      result[key] = replaceVariablesInBody(value, variables);
    }
    return result;
  }
  return body;
}
export function replaceVariablesInPairs(
  pairs: IPair[],
  variables: Record<string, string>
): IPair[] {
  return pairs.map(([key, value]) => [
    replaceVariables(key, variables),
    replaceVariables(value, variables),
  ]);
}
