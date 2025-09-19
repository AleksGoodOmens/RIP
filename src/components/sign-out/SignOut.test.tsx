import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { doSignOut } from '@/firebase/auth';

import { SignOutButton } from './SignOut';

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
}));

jest.mock('@/firebase/auth', () => {
  return {
    doSignOut: jest.fn().mockResolvedValue(undefined),
  };
});

describe('SignOutButton', () => {
  it('renders with translated text', () => {
    render(<SignOutButton />);
    expect(screen.getByRole('button', { name: 'button.signout' })).toBeInTheDocument();
  });

  it('signs out and redirects on click', async () => {
    render(<SignOutButton />);
    const button = screen.getByRole('button', { name: 'button.signout' });

    await userEvent.click(button);

    expect(doSignOut).toHaveBeenCalledTimes(1);
    expect(mockPush).toHaveBeenCalledWith('/');
  });
});
