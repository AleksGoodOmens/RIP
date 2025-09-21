import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import RegisterForm, { onSubmitProps } from './RegisterForm';

const setErrorMock = jest.fn();
const resetMock = jest.fn();

jest.mock('../actions', () => ({
  __esModule: true,
  registerAction: jest.fn(),
}));

jest.mock('next-intl/server', () => ({
  getTranslations: jest.fn().mockImplementation(() => {
    return (key: string) => key;
  }),
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
    handleSubmit: (fn: (data: onSubmitProps) => void) => (e: Event) => {
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

    expect(registerAction).toHaveBeenCalledWith(
      { confirmPassword: 'secret123', email: 'test@example.com', password: 'secret123' },
      'toasts.successRegister'
    );
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
