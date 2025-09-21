import { FirebaseError } from 'firebase/app';

import { mapFirebaseErrorToField } from './authErrors';

describe('mapFirebaseErrorToField', () => {
  const createFirebaseError = (code: string): FirebaseError =>
    new FirebaseError(code, 'Test message');

  it('maps known Firebase error codes to correct field and message', () => {
    expect(mapFirebaseErrorToField(createFirebaseError('auth/email-already-in-use'))).toEqual({
      field: 'email',
      message: 'This email is already registered.',
    });

    expect(mapFirebaseErrorToField(createFirebaseError('auth/invalid-email'))).toEqual({
      field: 'email',
      message: 'Please enter a valid email address.',
    });

    expect(mapFirebaseErrorToField(createFirebaseError('auth/user-not-found'))).toEqual({
      field: 'email',
      message: 'No account found with this email.',
    });

    expect(mapFirebaseErrorToField(createFirebaseError('auth/wrong-password'))).toEqual({
      field: 'password',
      message: 'Incorrect password. Please try again.',
    });

    expect(mapFirebaseErrorToField(createFirebaseError('auth/weak-password'))).toEqual({
      field: 'password',
      message: 'Password is too weak. Follow the requirements.',
    });

    expect(mapFirebaseErrorToField(createFirebaseError('auth/popup-closed-by-user'))).toEqual({
      field: 'popup',
      message: 'Google sign-in was cancelled.',
    });

    expect(mapFirebaseErrorToField(createFirebaseError('auth/too-many-requests'))).toEqual({
      field: 'password',
      message: 'Too many attempts. Please wait and try again later.',
    });
  });

  it('returns default message for unknown Firebase error code', () => {
    const result = mapFirebaseErrorToField(createFirebaseError('auth/unknown-code'));
    expect(result).toEqual({
      field: 'email',
      message: 'Unhandled Firebase error: auth/unknown-code',
    });
  });

  it('returns fallback message for non-Firebase errors', () => {
    const result = mapFirebaseErrorToField(new Error('Some other error'));
    expect(result).toEqual({
      field: 'email',
      message: 'Unexpected error. Please contact support.',
    });
  });
});
