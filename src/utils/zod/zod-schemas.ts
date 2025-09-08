import { z } from 'zod';

const passwordRequirements =
  'Password must be at least 6 characters and include: 1 uppercase, 1 lowercase, 1 number, and 1 special character';

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{6,}$/;

export const loginSchema = z.object({
  email: z.email(),
  password: z
    .string()
    .min(6, { message: passwordRequirements })
    .regex(passwordRegex, { message: passwordRequirements }),
});

export const registerSchema = loginSchema
  .extend({
    confirmPassword: z.string().min(6, { message: 'Please confirm your password' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });
