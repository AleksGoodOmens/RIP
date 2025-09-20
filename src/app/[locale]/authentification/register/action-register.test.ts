import { registerAction } from './actions';

const mockRedirect = jest.fn();
const mockParseForm = jest.fn();
const mockCreateUser = jest.fn();
const mockMapError = jest.fn();

jest.mock('next/navigation', () => ({
  __esModule: true,
  redirect: (...args: any[]) => mockRedirect(...args),
}));

jest.mock('@/utils/zod/parse-form', () => ({
  __esModule: true,
  parseForm: (...args: any[]) => mockParseForm(...args),
}));

jest.mock('@/firebase/auth', () => ({
  __esModule: true,
  doCreateUserWithEmailAndPassword: (...args: any[]) => mockCreateUser(...args),
}));

jest.mock('@/utils/authErrors', () => ({
  __esModule: true,
  mapFirebaseErrorToField: (...args: any[]) => mockMapError(...args),
}));

describe('registerAction', () => {
  const validInput = {
    email: 'test@example.com',
    password: 'secret123',
    confirmPassword: 'secret123',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns validation error if parseForm fails', async () => {
    mockParseForm.mockReturnValueOnce({ success: false, fieldErrors: { email: 'Required' } });

    const result = await registerAction(validInput, 'test message');

    expect(mockParseForm).toHaveBeenCalledWith(expect.anything(), validInput);
    expect(result).toEqual({ success: false, fieldErrors: { email: 'Required' } });
  });

  it('returns error if passwords do not match', async () => {
    mockParseForm.mockReturnValueOnce({
      success: true,
      data: { ...validInput, confirmPassword: 'wrong' },
    });

    const result = await registerAction(
      { ...validInput, confirmPassword: 'wrong' },
      'test message'
    );

    expect(result).toEqual({
      success: false,
      fieldErrors: { confirmPassword: 'Passwords do not match' },
    });
  });

  it('returns field error if Firebase fails', async () => {
    mockParseForm.mockReturnValueOnce({ success: true, data: validInput });
    mockCreateUser.mockRejectedValueOnce(new Error('auth/email-already-in-use'));
    mockMapError.mockReturnValueOnce({ field: 'email', message: 'Email already in use' });

    const result = await registerAction(validInput, 'test message');

    expect(mockCreateUser).toHaveBeenCalledWith({
      email: validInput.email,
      password: validInput.password,
    });
    expect(mockMapError).toHaveBeenCalled();
    expect(result).toEqual({ success: false, fieldErrors: { email: 'Email already in use' } });
  });

  it('calls redirect on success', async () => {
    mockParseForm.mockReturnValueOnce({ success: true, data: validInput });
    mockCreateUser.mockResolvedValueOnce(undefined);

    await registerAction(validInput, 'test message');

    expect(mockRedirect).toHaveBeenCalledWith('/');
  });
});
