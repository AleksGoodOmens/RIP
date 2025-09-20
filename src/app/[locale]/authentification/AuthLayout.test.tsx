import { render, screen } from '@testing-library/react';
import { useRouter } from 'next/navigation';

import { AuthContext } from '@/context/authContext';

import AuthLayout from './layout';

jest.mock('next/navigation', () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));

jest.mock('@/components', () => ({
  __esModule: true,
  Navbar: () => <div data-testid="navbar">Mocked Navbar</div>,
}));

describe('AuthLayout', () => {
  const pushMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });
  });

  const renderWithAuth = (ctx: any) => {
    return render(
      <AuthContext.Provider value={ctx}>
        <AuthLayout>
          <div data-testid="child">Child content</div>
        </AuthLayout>
      </AuthContext.Provider>
    );
  };

  it('renders Navbar and children when not authenticated', () => {
    renderWithAuth({ user: null, loading: false });

    expect(screen.getByTestId('navbar')).toBeInTheDocument();
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('renders loading message when loading is true', () => {
    renderWithAuth({ user: null, loading: true });

    expect(screen.getByText('Checking auth user')).toBeInTheDocument();
  });

  it('redirects to "/" when user is authenticated', () => {
    renderWithAuth({ user: { id: '123' }, loading: false });

    expect(pushMock).toHaveBeenCalledWith('/');
  });
});
