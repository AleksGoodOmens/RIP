export type IPair = [string, string];
export interface RequestResult {
  status: number;
  body: unknown;
}

export const METHODS = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'] as const;

export type HttpMethod = (typeof METHODS)[number];

export interface IRequestSnippetGenerator {
  method: HttpMethod;
  headers: IPair[];
  body?: string;
  url: string;
}

export interface HistoryItem {
  id: string;
  base64: {
    body: string;
    headers: string;
  };
  uid: string;
  metrics: {
    requestSize: number;
    endpoint: string;
    url: string;
    responseSize: number;
    duration: number;
    method: string;
    timestamp: string;
    statusCode: number;
  };
}
