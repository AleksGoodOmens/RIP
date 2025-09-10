import { z } from 'zod';

export const loginSchema = z.object({
  email: z.email(),
  password: z
    .string()
    .nonempty('please type password')
    .regex(/[a-z]/, '1 lowercase letter')
    .regex(/[A-Z]/, '1 uppercase letter')
    .min(6, 'At least 6 characters'),
});

export const registerSchema = loginSchema
  .extend({
    confirmPassword: z.string().min(6, { message: 'Please confirm your password' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });
