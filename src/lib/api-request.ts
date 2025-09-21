import { RequestResult } from '@/interfaces';

import { isValidJSON } from './utils';

export async function sendUniversalRequest(
  url: string,
  method: string,
  headers: Record<string, string>,
  body?: unknown
): Promise<RequestResult> {
  const options: RequestInit = {
    method,
    headers,
  };

  if (
    body &&
    ['POST', 'PUT', 'PATCH', 'HEAD', 'OPTIONS', 'DELETE'].includes(method.toUpperCase())
  ) {
    if (typeof body === 'string') {
      if (isValidJSON(body)) {
        const parsedBody = JSON.parse(body);
        options.body = JSON.stringify(parsedBody);

        if (!headers['Content-Type'] && !headers['content-type']) {
          options.headers = {
            ...options.headers,
            'Content-Type': 'application/json',
          };
        }
      } else {
        options.body = body;

        if (!headers['Content-Type'] && !headers['content-type']) {
          options.headers = {
            ...options.headers,
            'Content-Type': 'text/plain',
          };
        }
      }
    } else {
      options.body = JSON.stringify(body);

      if (!headers['Content-Type'] && !headers['content-type']) {
        options.headers = {
          ...options.headers,
          'Content-Type': 'application/json',
        };
      }
    }
  }

  try {
    const response = await fetch(url, options);

    const contentType = response.headers.get('content-type');
    let parsedBody;
    if (contentType?.includes('application/json')) {
      parsedBody = await response.json();
    } else {
      parsedBody = await response.text();
    }

    return {
      status: response.status,
      body: parsedBody,
    };
  } catch (error) {
    return {
      status: 0,
      body: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}
