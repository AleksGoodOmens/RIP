import { redirect } from 'next/navigation';

import { doSignInWithEmailAndPassword } from '@/firebase/auth';
import { loginSchema } from '@/utils/zod/zod-schemas';

export async function loginAction(formData: FormData) {
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

  await doSignInWithEmailAndPassword({ email, password });

  redirect('/home');
}
