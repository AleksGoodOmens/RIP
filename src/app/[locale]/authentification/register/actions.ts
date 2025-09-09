import { redirect } from 'next/navigation';

import { doCreateUserWithEmailAndPassword } from '@/firebase/auth';
import { registerSchema } from '@/utils/zod/zod-schemas';

type RegisterResult = { success: true } | { success: false; fieldErrors: Record<string, string> };

export async function registerAction(formData: FormData): Promise<RegisterResult> {
  const raw = {
    email: formData.get('email'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword'),
  };

  const parsed = registerSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};

    parsed.error.issues.forEach((issue) => {
      const field = issue.path[0];
      if (typeof field === 'string') {
        fieldErrors[field] = issue.message;
      }
    });

    return { success: false, fieldErrors };
  }

  const { email, password, confirmPassword } = parsed.data;

  if (password !== confirmPassword) {
    return {
      success: false,
      fieldErrors: {
        confirmPassword: 'Passwords do not match',
      },
    };
  }

  await doCreateUserWithEmailAndPassword({ email, password });

  redirect('/home');
}
