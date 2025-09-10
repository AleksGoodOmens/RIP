import { redirect } from 'next/navigation';

import { doCreateUserWithEmailAndPassword } from '@/firebase/auth';
import { mapFirebaseErrorToField } from '@/utils/authErrors';
import { registerSchema } from '@/utils/zod/zod-schemas';

import { onSubmitProps } from './components/RegisterForm';

type RegisterResult = { success: true } | { success: false; fieldErrors: Record<string, string> };

export async function registerAction(raw: onSubmitProps): Promise<RegisterResult> {
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

  try {
    await doCreateUserWithEmailAndPassword({ email, password });
  } catch (error) {
    const { field, message } = mapFirebaseErrorToField(error);
    return {
      success: false,
      fieldErrors: {
        [field]: message,
      },
    };
  }

  redirect('/home');
}
