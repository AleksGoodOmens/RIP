import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type FormActionResult =
  | { success: true }
  | { success: false; fieldErrors: Record<string, string> };
