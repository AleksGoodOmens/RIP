import { redirect } from 'next/navigation';

import { doSignInWithEmailAndPassword } from '@/firebase/auth';
import { mapFirebaseErrorToField } from '@/utils/authErrors';
import { loginSchema } from '@/utils/zod/zod-schemas';

type LoginResult = { success: true } | { success: false; fieldErrors: Record<string, string> };

export async function loginAction(formData: FormData): Promise<LoginResult> {
  const raw = {
    email: formData.get('email'),
    password: formData.get('password'),
  };

  const parsed = loginSchema.safeParse(raw);
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

  const { email, password } = parsed.data;

  try {
    await doSignInWithEmailAndPassword({ email, password });
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
