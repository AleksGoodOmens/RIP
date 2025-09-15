import { RequestResult } from '@/interfaces';

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

  if (body && ['POST', 'PUT', 'PATCH', 'HEAD', 'OPTIONS'].includes(method.toUpperCase())) {
    options.body = JSON.stringify(body);
  }

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
}
