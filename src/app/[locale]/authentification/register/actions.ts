import { redirect } from 'next/navigation';
import { toast } from 'react-toastify';

import { doCreateUserWithEmailAndPassword } from '@/firebase/auth';
import { FormActionResult } from '@/lib/utils';
import { mapFirebaseErrorToField } from '@/utils/authErrors';
import { parseForm } from '@/utils/zod/parse-form';
import { registerSchema } from '@/utils/zod/zod-schemas';

export async function registerAction(
  raw: {
    email: string;
    password: string;
    confirmPassword: string;
  },
  message: string
): Promise<FormActionResult> {
  const parsed = parseForm(registerSchema, raw);
  if (!parsed.success) return parsed;

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
    return { success: false, fieldErrors: { [field]: message } };
  }
  toast.success(message);

  redirect('/');
}
