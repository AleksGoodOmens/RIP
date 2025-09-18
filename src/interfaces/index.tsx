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
