import { z } from 'zod';

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{6,}$/;

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(6).regex(passwordRegex),
});

export const registerSchema = loginSchema
  .extend({
    confirmPassword: z.string().min(6, { message: 'Please confirm your password' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });
