import { RequestResult } from '@/interfaces';

import { isValidJSON } from './utils';

interface RequestMetrics {
  duration: number;
  statusCode: number;
  timestamp: string;
  method: string;
  requestSize: number;
  responseSize: number;
  errorDetails?: string;
  endpoint: string;
  url: string;
}

interface Base64 {
  headers: string;
  body?: string;
}

interface StoredData {
  metrics: RequestMetrics;
  base64: Base64;
}

async function sendRequestMetrics(data: StoredData, uid: string): Promise<void> {
  try {
    await fetch(`/api/history?uid=${uid}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.error('Failed to send request metrics:', error);
  }
}

interface SendUniversalRequestProps {
  url: string;
  method: string;
  headers: Record<string, string>;
  uid: string;
  base64: {
    headers: string;
    body?: string;
  };
  body?: unknown;
}

export async function sendUniversalRequest({
  url,
  method,
  headers,
  uid,
  body,
  base64,
}: SendUniversalRequestProps): Promise<RequestResult> {
  const startTime = performance.now();
  const timestamp = new Date().toISOString();

  const options: RequestInit = {
    method,
    headers,
  };
  let requestSize = 0;
  if (body) {
    if (typeof body === 'string') {
      requestSize = new Blob([body]).size;
    } else {
      requestSize = new Blob([JSON.stringify(body)]).size;
    }
  }

  try {
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

    const response = await fetch(url, options);
    const endTime = performance.now();
    const duration = endTime - startTime;

    const contentType = response.headers.get('content-type');
    let responseBody;
    let responseSize = 0;

    if (contentType?.includes('application/json')) {
      const text = await response.text();
      responseBody = JSON.parse(text);
      responseSize = new Blob([text]).size;
    } else {
      const text = await response.text();
      responseBody = text;
      responseSize = new Blob([text]).size;
    }

    const metrics: RequestMetrics = {
      duration,
      statusCode: response.status,
      timestamp,
      method,
      requestSize,
      responseSize,
      endpoint: new URL(url).pathname,
      url,
    };

    sendRequestMetrics({ metrics, base64 }, uid).catch((error) =>
      console.error('Failed to send metrics:', error)
    );

    return {
      status: response.status,
      body: responseBody,
    };
  } catch (error) {
    const endTime = performance.now();
    const duration = endTime - startTime;

    const metrics: RequestMetrics = {
      duration,
      statusCode: 0,
      timestamp,
      method,
      requestSize,
      responseSize: 0,
      errorDetails: error instanceof Error ? error.message : 'Unknown error',
      endpoint: new URL(url).pathname,
      url,
    };

    sendRequestMetrics({ metrics, base64 }, uid).catch((err) =>
      console.error('Failed to send error metrics:', err)
    );

    console.error('Request failed:', error);
    return {
      status: 0,
      body: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}
