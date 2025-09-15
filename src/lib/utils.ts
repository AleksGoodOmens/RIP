import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

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
