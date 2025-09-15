export interface RequestResult {
  status: number;
  headers: Record<string, string>;
  body: unknown;
}

export async function sendUniversalRequest(
  url: string,
  method: string,
  body?: unknown
): Promise<RequestResult> {
  const options: RequestInit = {
    method,
    headers: { 'Content-Type': 'application/json' },
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

  const headers: Record<string, string> = {};
  response.headers.forEach((value, key) => {
    headers[key] = value;
  });

  return {
    status: response.status,
    headers,
    body: parsedBody,
  };
}
