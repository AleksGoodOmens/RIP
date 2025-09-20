import { loginAction } from './action';

const mockSignIn = jest.fn();
const mockParseForm = jest.fn();
const mockMapError = jest.fn();
const mockRedirect = jest.fn();

jest.mock('next/navigation', () => ({
  __esModule: true,
  redirect: (...args: any[]) => mockRedirect(...args),
}));

jest.mock('@/firebase/auth', () => ({
  __esModule: true,
  doSignInWithEmailAndPassword: (...args: any[]) => mockSignIn(...args),
}));

jest.mock('@/utils/zod/parse-form', () => ({
  __esModule: true,
  parseForm: (...args: any[]) => mockParseForm(...args),
}));

jest.mock('@/utils/authErrors', () => ({
  __esModule: true,
  mapFirebaseErrorToField: (...args: any[]) => mockMapError(...args),
}));

describe('loginAction', () => {
  const formData = new FormData();
  formData.append('email', 'test@example.com');
  formData.append('password', 'secret');

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns validation error if parseForm fails', async () => {
    mockParseForm.mockReturnValueOnce({ success: false, fieldErrors: { email: 'Required' } });

    const result = await loginAction(formData);

    expect(mockParseForm).toHaveBeenCalled();
    expect(result).toEqual({ success: false, fieldErrors: { email: 'Required' } });
  });

  it('returns field error if sign-in fails', async () => {
    mockParseForm.mockReturnValueOnce({
      success: true,
      data: { email: 'test@example.com', password: 'secret' },
    });
    mockSignIn.mockRejectedValueOnce(new Error('auth/wrong-password'));
    mockMapError.mockReturnValueOnce({ field: 'password', message: 'Wrong password' });

    const result = await loginAction(formData);

    expect(mockSignIn).toHaveBeenCalledWith({ email: 'test@example.com', password: 'secret' });
    expect(mockMapError).toHaveBeenCalled();
    expect(result).toEqual({ success: false, fieldErrors: { password: 'Wrong password' } });
  });

  it('calls redirect on successful login', async () => {
    mockParseForm.mockReturnValueOnce({
      success: true,
      data: { email: 'test@example.com', password: 'secret' },
    });
    mockSignIn.mockResolvedValueOnce(undefined);

    await loginAction(formData);

    expect(mockRedirect).toHaveBeenCalledWith('/');
  });
});
