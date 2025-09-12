import { FirebaseError } from 'firebase/app';

type AuthField = 'email' | 'password' | 'popup';

export function mapFirebaseErrorToField(error: unknown): {
  field: AuthField;
  message: string;
} {
  if (error instanceof FirebaseError) {
    switch (error.code) {
      case 'auth/email-already-in-use':
        return { field: 'email', message: 'This email is already registered.' };
      case 'auth/invalid-email':
        return { field: 'email', message: 'Please enter a valid email address.' };
      case 'auth/user-not-found':
        return { field: 'email', message: 'No account found with this email.' };
      case 'auth/wrong-password':
        return { field: 'password', message: 'Incorrect password. Please try again.' };
      case 'auth/weak-password':
        return { field: 'password', message: 'Password is too weak. Follow the requirements.' };
      case 'auth/popup-closed-by-user':
        return { field: 'popup', message: 'Google sign-in was cancelled.' };
      case 'auth/too-many-requests':
        return {
          field: 'password',
          message: 'Too many attempts. Please wait and try again later.',
        };
      default:
        return {
          field: 'email',
          message: `Unhandled Firebase error: ${error.code}`,
        };
    }
  }

  return {
    field: 'email',
    message: 'Unexpected error. Please contact support.',
  };
}
