jest.mock('next/navigation', () => ({
  __esModule: true,
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

jest.mock('next-intl/server', () => ({
  getTranslations: jest.fn().mockImplementation(() => {
    return (key: string) => key;
  }),
}));

jest.mock('next-intl/routing', () => ({
  __esModule: true,
  defineRouting: () => ({
    locales: ['en', 'ru'],
    locale: 'ru',
    pathname: '/',
  }),
}));

jest.mock('next-intl', () => ({
  __esModule: true,
  useTranslations: () => (key: string) => key,
}));

jest.mock('next-intl/navigation', () => ({
  __esModule: true,
  createNavigation: () => ({
    push: jest.fn(),
    replace: jest.fn(),
  }),
}));

jest.mock('react-syntax-highlighter/dist/esm/styles/prism', () => ({
  __esModule: true,
  atomDark: {},
  oneLight: {},
}));

jest.mock('react-syntax-highlighter/dist/esm/styles/hljs', () => ({
  __esModule: true,
  atomOneDark: {},
  atomOneLight: {},
}));

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import LoginForm from './LoginForm';

const setErrorMock = jest.fn();

jest.mock('../action', () => ({
  __esModule: true,
  loginAction: jest.fn(),
}));

jest.mock('@/utils/hooks/useAuth', () => ({
  __esModule: true,
  useLoginForm: () => ({
    register: (name: string) => ({
      name,
      onChange: jest.fn(),
      onBlur: jest.fn(),
      ref: jest.fn(),
    }),
    handleSubmit: (fn: any) => (e: any) => {
      e.preventDefault();
      return fn({
        email: 'test@example.com',
        password: 'secret123',
      });
    },
    setError: setErrorMock,
    formState: {
      errors: {},
      isSubmitting: false,
    },
  }),
}));

describe('LoginForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all fields and submit button', () => {
    render(<LoginForm />);

    expect(screen.getByLabelText('email.label')).toBeInTheDocument();
    expect(screen.getByLabelText('password.label')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'button.enter' })).toBeInTheDocument();
  });

  it('calls loginAction on submit', async () => {
    const { loginAction } = require('../action');
    loginAction.mockResolvedValueOnce({ success: true });

    render(<LoginForm />);
    await userEvent.click(screen.getByRole('button', { name: 'button.enter' }));

    expect(loginAction).toHaveBeenCalled();
  });

  it('sets field errors if login fails', async () => {
    const { loginAction } = require('../action');
    loginAction.mockResolvedValueOnce({
      success: false,
      fieldErrors: {
        email: 'Invalid email',
        password: 'Wrong password',
      },
    });

    render(<LoginForm />);
    await userEvent.click(screen.getByRole('button', { name: 'button.enter' }));

    expect(setErrorMock).toHaveBeenCalledWith('email', { message: 'Invalid email' });
    expect(setErrorMock).toHaveBeenCalledWith('password', { message: 'Wrong password' });
  });
});
