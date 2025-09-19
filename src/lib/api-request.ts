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

  console.log('Request details:', {
    url,
    method,
    headers,
    body,
    bodyType: typeof body,
  });

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

  console.log('Final request options:', options);

  try {
    const response = await fetch(url, options);

    const contentType = response.headers.get('content-type');
    let parsedBody;
    if (contentType?.includes('application/json')) {
      parsedBody = await response.json();
    } else {
      parsedBody = await response.text();
    }

    console.log('Response:', parsedBody);

    return {
      status: response.status,
      body: parsedBody,
    };
  } catch (error) {
    console.error('Request failed:', error);
    return {
      status: 0,
      body: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}
