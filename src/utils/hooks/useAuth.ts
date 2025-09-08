import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { loginSchema, registerSchema } from '../zod/zod-schemas';

type LoginFormData = z.infer<typeof loginSchema>;
type RegisterFormData = z.infer<typeof registerSchema>;

export const useLoginForm = () =>
  useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onSubmit',
  });

export const useRegisterForm = () =>
  useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: 'onSubmit',
  });
