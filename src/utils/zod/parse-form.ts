import { z } from 'zod';

export function parseForm<T extends z.ZodTypeAny>(
  schema: T,
  raw: unknown
):
  | { success: true; data: z.infer<T> }
  | { success: false; fieldErrors: Partial<Record<keyof z.infer<T>, string>> } {
  const parsed = schema.safeParse(raw);

  if (!parsed.success) {
    const fieldErrors: Partial<Record<keyof z.infer<T>, string>> = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0];
      if (typeof field === 'string') {
        fieldErrors[field as keyof z.infer<T>] = issue.message;
      }
    }
    return { success: false, fieldErrors };
  }
  return { success: true, data: parsed.data };
}
