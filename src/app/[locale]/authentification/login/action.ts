import { redirect } from 'next/navigation';

import { doSignInWithEmailAndPassword } from '@/firebase/auth';
import { FormActionResult } from '@/lib/utils';
import { mapFirebaseErrorToField } from '@/utils/authErrors';
import { parseForm } from '@/utils/zod/parse-form';
import { loginSchema } from '@/utils/zod/zod-schemas';

export async function loginAction(formData: FormData): Promise<FormActionResult> {
  const raw = {
    email: formData.get('email'),
    password: formData.get('password'),
  };

  const parsed = parseForm(loginSchema, raw);
  if (!parsed.success) return parsed;

  const { email, password } = parsed.data;

  try {
    await doSignInWithEmailAndPassword({ email, password });
  } catch (error) {
    const { field, message } = mapFirebaseErrorToField(error);
    return { success: false, fieldErrors: { [field]: message } };
  }

  redirect('/');
}
