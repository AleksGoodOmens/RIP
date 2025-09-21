import { render, screen } from '@testing-library/react';

import { Navigation } from './Navigation';

interface LinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

jest.mock('@/i18n/navigation', () => ({
  usePathname: jest.fn(),
  Link: ({ href, children, className }: LinkProps) => (
    <a href={href} className={className} data-testid={`link-${href}`}>
      {children}
    </a>
  ),
}));

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key.toUpperCase(),
}));

describe('Navigation', () => {
  const { usePathname } = require('@/i18n/navigation');

  it('renders all navigation links', () => {
    usePathname.mockReturnValue('/');

    render(<Navigation />);

    expect(screen.getByTestId('link-/')).toHaveTextContent('HOME');
    expect(screen.getByTestId('link-/rest-client')).toHaveTextContent('REST-CLIENT');
    expect(screen.getByTestId('link-/rest-client/variables')).toHaveTextContent('VARIABLES');
    expect(screen.getByTestId('link-/rest-client/history')).toHaveTextContent('HISTORY');
  });

  it('applies active styles to /rest-client correctly', () => {
    usePathname.mockReturnValue('/rest-client');

    render(<Navigation />);

    const restClientLink = screen.getByTestId('link-/rest-client');
    expect(restClientLink.className).toMatch(/text-destructive/);
    expect(restClientLink.className).toMatch(/animate-pulse/);
  });

  it('does not apply active styles to /rest-client/history when /rest-client is active', () => {
    usePathname.mockReturnValue('/rest-client');

    render(<Navigation />);

    const historyLink = screen.getByTestId('link-/rest-client/history');
    expect(historyLink.classList.contains('text-destructive')).toBe(false);
  });

  it('applies active styles to /rest-client/history only when exact match', () => {
    usePathname.mockReturnValue('/rest-client/history');

    render(<Navigation />);

    const historyLink = screen.getByTestId('link-/rest-client/history');
    expect(historyLink.className).toMatch(/text-destructive/);
  });
});
