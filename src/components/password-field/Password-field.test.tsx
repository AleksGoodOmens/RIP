import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { PasswordField } from './Password-field';

const pushMock = jest.fn();

jest.mock('next/navigation', () => ({
  __esModule: true,
  useRouter: () => ({
    push: pushMock,
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

const mockRegister = {
  name: 'password',
  onChange: jest.fn(),
  onBlur: jest.fn(),
  ref: jest.fn(),
};

describe('PasswordField', () => {
  it('renders with label and placeholder', () => {
    render(<PasswordField label="Password" placeholder="Enter password" register={mockRegister} />);

    const input = screen.getByLabelText('Password');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('placeholder', 'Enter password');
    expect(input).toHaveAttribute('type', 'password');
    expect(screen.getByRole('button', { name: 'Show password' })).toBeInTheDocument();
  });

  it('toggles password visibility', async () => {
    render(<PasswordField label="Password" register={mockRegister} />);

    const input = screen.getByLabelText('Password') as HTMLInputElement;
    const toggle = screen.getByRole('button', { name: 'Show password' });

    expect(input.type).toBe('password');

    await userEvent.click(toggle);

    expect(screen.getByRole('button', { name: 'Hide password' })).toBeInTheDocument();
    expect(input.type).toBe('text');
  });

  it('renders error message', () => {
    render(
      <PasswordField label="Password" error="This field is required" register={mockRegister} />
    );

    expect(screen.getByText('This field is required')).toBeInTheDocument();
  });
});
