const mockSignOut = jest.fn();

jest.mock('./firebase', () => ({
  auth: {
    signOut: () => mockSignOut(),
  },
}));

jest.mock('firebase/auth', () => ({
  createUserWithEmailAndPassword: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
}));

import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

import { doCreateUserWithEmailAndPassword, doSignInWithEmailAndPassword, doSignOut } from './auth';

describe('auth-actions', () => {
  const email = 'test@example.com';
  const password = 'securePassword';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('calls createUserWithEmailAndPassword with correct arguments', async () => {
    (createUserWithEmailAndPassword as jest.Mock).mockResolvedValueOnce('user-created');

    const result = await doCreateUserWithEmailAndPassword({ email, password });

    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(expect.anything(), email, password);
    expect(result).toBe('user-created');
  });

  it('calls signInWithEmailAndPassword with correct arguments', async () => {
    (signInWithEmailAndPassword as jest.Mock).mockResolvedValueOnce('user-signed-in');

    const result = await doSignInWithEmailAndPassword({ email, password });

    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(expect.anything(), email, password);
    expect(result).toBe('user-signed-in');
  });

  it('calls auth.signOut', async () => {
    mockSignOut.mockResolvedValueOnce('signed-out');

    const result = await doSignOut();

    expect(mockSignOut).toHaveBeenCalled();
    expect(result).toBe('signed-out');
  });
});
