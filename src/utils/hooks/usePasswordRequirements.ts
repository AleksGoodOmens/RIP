import { useMemo } from 'react';

const passwordRequirements = [
  { label: 'At least 6 characters', test: (p: string) => p.length >= 6 },
  { label: '1 uppercase letter', test: (p: string) => /[A-Z]/.test(p) },
  { label: '1 lowercase letter', test: (p: string) => /[a-z]/.test(p) },
  { label: '1 number', test: (p: string) => /\d/.test(p) },
  { label: '1 special character', test: (p: string) => /[^A-Za-z\d]/.test(p) },
];

export function usePasswordRequirements(password: string) {
  return useMemo(
    () =>
      passwordRequirements.map((req) => ({
        label: req.label,
        met: req.test(password),
      })),
    [password]
  );
}
