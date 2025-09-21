import { render, act } from '@testing-library/react';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { toast } from 'react-toastify';

import { AuthContext } from '@/context/authContext';

import { AuthProvider } from './AuthProvider';

jest.mock('@/firebase/firebase', () => ({
  auth: {},
}));

jest.mock('firebase/auth', () => ({
  onAuthStateChanged: jest.fn(),
  signOut: jest.fn(),
}));

jest.mock('next-intl', () => ({
  useTranslations: () => () => 'Logged out',
}));

jest.mock('react-toastify', () => ({
  toast: {
    info: jest.fn(),
  },
}));

describe('AuthProvider', () => {
  const mockUser: User = { uid: '123', email: 'test@example.com' } as User;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('sets user and loading=false after auth state change', async () => {
    let authCallback: (user: User | null) => void = () => {};
    (onAuthStateChanged as jest.Mock).mockImplementation((_auth, cb) => {
      authCallback = cb;
      return () => {};
    });

    let contextValue: {
      user: User | null;
      loading: boolean;
    } = { user: null, loading: true };

    render(
      <AuthProvider>
        <AuthContext.Consumer>
          {(value) => {
            contextValue = value;
            return <div>Child</div>;
          }}
        </AuthContext.Consumer>
      </AuthProvider>
    );

    await act(async () => {
      authCallback(mockUser);
    });

    expect(contextValue.user).toEqual(mockUser);
    expect(contextValue.loading).toBe(false);
  });

  it('calls signOut and shows toast on logout', async () => {
    (signOut as jest.Mock).mockResolvedValue(undefined);

    let authCallback: (user: User | null) => void = () => {};
    (onAuthStateChanged as jest.Mock).mockImplementation((_auth, cb) => {
      authCallback = cb;
      return () => {};
    });

    let contextValue: {
      user: User | null;
      logout: () => Promise<void>;
    } = { user: null, logout: async () => {} };

    render(
      <AuthProvider>
        <AuthContext.Consumer>
          {(value) => {
            contextValue = value;
            return <div>Child</div>;
          }}
        </AuthContext.Consumer>
      </AuthProvider>
    );

    await act(async () => {
      authCallback(mockUser);
    });

    await act(async () => {
      await contextValue.logout();
    });

    expect(signOut).toHaveBeenCalled();
    expect(toast.info).toHaveBeenCalledWith('Logged out', { toastId: 'logout' });
    expect(contextValue.user).toBe(null);
  });
});
