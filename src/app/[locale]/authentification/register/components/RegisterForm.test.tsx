jest.mock('next/navigation', () => ({
  __esModule: true,
  useRouter: () => ({
    push: jest.fn(),
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

jest.mock('next-intl/routing', () => ({
  __esModule: true,
  defineRouting: () => ({}),
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

import RegisterForm from './RegisterForm';

const setErrorMock = jest.fn();
const resetMock = jest.fn();

jest.mock('../actions', () => ({
  __esModule: true,
  registerAction: jest.fn(),
}));

jest.mock('@/utils/hooks/useAuth', () => ({
  __esModule: true,
  useRegisterForm: () => ({
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
        confirmPassword: 'secret123',
      });
    },
    setError: setErrorMock,
    reset: resetMock,
    formState: {
      errors: {},
      isSubmitting: false,
      isValid: true,
    },
  }),
}));

describe('RegisterForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all fields and submit button', () => {
    render(<RegisterForm />);

    expect(screen.getByLabelText('email.label')).toBeInTheDocument();
    expect(screen.getByLabelText('password.label')).toBeInTheDocument();
    expect(screen.getByLabelText('confirmPassword.label')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'button.submit' })).toBeInTheDocument();
  });

  it('calls registerAction and resets form on success', async () => {
    const { registerAction } = require('../actions');
    registerAction.mockResolvedValueOnce({ success: true });

    render(<RegisterForm />);
    await userEvent.click(screen.getByRole('button', { name: 'button.submit' }));

    expect(registerAction).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'secret123',
      confirmPassword: 'secret123',
    });
    expect(resetMock).toHaveBeenCalled();
  });

  it('sets field errors if registration fails', async () => {
    const { registerAction } = require('../actions');
    registerAction.mockResolvedValueOnce({
      success: false,
      fieldErrors: {
        email: 'Invalid email',
        confirmPassword: 'Passwords do not match',
      },
    });

    render(<RegisterForm />);
    await userEvent.click(screen.getByRole('button', { name: 'button.submit' }));

    expect(setErrorMock).toHaveBeenCalledWith('email', { message: 'Invalid email' });
    expect(setErrorMock).toHaveBeenCalledWith('confirmPassword', {
      message: 'Passwords do not match',
    });
    expect(resetMock).not.toHaveBeenCalled();
  });
});
