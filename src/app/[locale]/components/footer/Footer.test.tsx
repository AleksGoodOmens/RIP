import { render, screen } from '@testing-library/react';

import { Footer } from './Footer';

import type { ReactNode } from 'react';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: { src: string; alt: string; width?: number; className?: string }) => (
    <img {...props} alt={props.alt} />
  ),
}));

interface LinkProps {
  href: string;
  children: ReactNode;
  target?: string;
  className?: string;
}
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ href, children, ...rest }: LinkProps) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
}));

jest.mock('@/components', () => ({
  Text: ({ children }: { children: ReactNode }) => <div>{children}</div>,
}));

jest.mock('./images/ALEKS.png', () => 'aleks-mock.png');
jest.mock('./images/DANIAR.jpg', () => 'daniar-mock.jpg');
jest.mock('./images/LENA.jpg', () => 'lena-mock.jpg');
jest.mock('./images/rss-logo.c19ce1b4.svg', () => 'rss-mock.svg');

describe('Footer', () => {
  it('renders RS-School logo link', () => {
    render(<Footer />);
    const rsSchoolLink = screen.getByRole('link', { name: /RS-School/i });
    expect(rsSchoolLink).toHaveAttribute('href', 'https://rs.school/courses/reactjs');
  });

  it('renders developer GitHub links', () => {
    render(<Footer />);
    const devLinks = [
      { href: 'https://github.com/AleksGoodOmens', alt: 'AleksGoodOmens' },
      { href: 'https://github.com/Lena523', alt: 'Lena523' },
      { href: 'https://github.com/hapurzhonau', alt: 'hapurzhonau' },
    ];

    devLinks.forEach(({ href, alt }) => {
      const link = screen.getByRole('link', { name: new RegExp(alt, 'i') });
      expect(link).toHaveAttribute('href', href);
    });
  });

  it('renders JustCodeIt text', () => {
    render(<Footer />);
    expect(screen.getByText(/JustCodeIt/i)).toBeInTheDocument();
  });

  it('renders development year correctly', () => {
    render(<Footer />);
    const currYear = new Date().getFullYear();
    expect(screen.getByText(/2025/)).toBeInTheDocument();
    if (currYear !== 2025) {
      expect(screen.getByText(new RegExp(`- ${currYear}`))).toBeInTheDocument();
    }
  });
});
