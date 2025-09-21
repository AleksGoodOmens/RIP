import { render, screen } from '@testing-library/react';

import { AuthContext, type AuthContextType } from '@/context/authContext';

import Content from './Content';

jest.mock('next-intl/server', () => ({
  getTranslations: jest.fn(() => (key: string) => key),
}));

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const dict: Record<string, string> = {
      greetings: 'Hello',
      'button.login': 'Login',
      'button.register': 'Register',
    };
    return dict[key] || key;
  },
}));

jest.mock('@/components/nav-bar/NavBar', () => ({
  Navbar: () => <div>Mock Navbar</div>,
}));

describe('Content', () => {
  const renderWithUser = (user: AuthContextType['user']) => {
    render(
      <AuthContext.Provider value={{ user, loading: false, logout: async () => {} }}>
        <Content />
      </AuthContext.Provider>
    );
  };

  it('renders greetings and Navbar when user is not logged in', () => {
    renderWithUser(null);

    expect(
      screen.getByText((content) => content.replace(/\s+/g, '') === 'Hello!')
    ).toBeInTheDocument();
    expect(screen.getByText('Mock Navbar')).toBeInTheDocument();
  });

  it('renders greetings with email when user is logged in', () => {
    const mockUser = { email: 'test@example.com' } as AuthContextType['user'];

    renderWithUser(mockUser);

    expect(
      screen.getByText((content) => content.replace(/\s+/g, '') === 'Hellotest@example.com!')
    ).toBeInTheDocument();
    expect(screen.queryByText('Mock Navbar')).not.toBeInTheDocument();
  });
});
