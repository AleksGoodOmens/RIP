import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { IRequestSnippetGenerator } from '@/interfaces';

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
