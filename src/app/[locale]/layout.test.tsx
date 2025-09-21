import { render, screen } from '@testing-library/react';
import React from 'react';

import RootLayout from './layout';

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

jest.mock('next/dynamic', () => ({
  __esModule: true,
  default: () => {
    const MockComponent = () => <div>Mock Header</div>;
    return MockComponent;
  },
}));

jest.mock('./components/footer/Footer', () => ({
  Footer: () => <div>Mock Footer</div>,
}));
jest.mock('@/components', () => ({
  Toast: () => <div>Mock Toast</div>,
}));
jest.mock('@/providers/Providers', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));
jest.mock('next-intl', () => ({
  __esModule: true,
  hasLocale: jest.fn(),
}));
jest.mock('next/navigation', () => ({
  __esModule: true,
  notFound: jest.fn(),
}));
jest.mock('../../../messages/en.json', () => ({ default: {} }), { virtual: true });
jest.mock('../../../messages/ru.json', () => ({ default: {} }), { virtual: true });
jest.mock('next/font/google', () => ({
  Geist: () => ({ variable: '--mock-font-sans', style: {} }),
  Geist_Mono: () => ({ variable: '--mock-font-mono', style: {} }),
}));

describe('RootLayout', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders basic layout without crashing', async () => {
    const { hasLocale } = require('next-intl');
    hasLocale.mockReturnValue(true);

    const children = <div>Test Child</div>;
    const params: Promise<{ locale: string }> = Promise.resolve({ locale: 'en' });

    const result = await RootLayout({ children, params });
    render(<>{result.props.children.props.children}</>);

    expect(screen.getByText('Mock Header')).toBeInTheDocument();
    expect(screen.getByText('Test Child')).toBeInTheDocument();
    expect(screen.getByText('Mock Footer')).toBeInTheDocument();
    expect(screen.getByText('Mock Toast')).toBeInTheDocument();
  });

  it('calls notFound if locale is invalid', async () => {
    const { hasLocale } = require('next-intl');
    const { notFound } = require('next/navigation');
    hasLocale.mockReturnValue(false);

    const children = <div>Child</div>;
    const params: Promise<{ locale: string }> = Promise.resolve({ locale: 'ru' });

    await RootLayout({ children, params });

    expect(notFound).toHaveBeenCalled();
  });
});
