import { render, screen } from '@testing-library/react';
import React from 'react';

jest.mock('next-intl/server', () => ({
  getTranslations: jest.fn().mockResolvedValue((key: string) => key),
}));
jest.mock('./images/candle.gif', () => 'candle.gif');

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ alt }: { alt: string }) => <img alt={alt} />,
}));

jest.mock('@/i18n/navigation', () => ({
  __esModule: true,
  Link: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

jest.mock('@/components', () => ({
  __esModule: true,
  Text: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

import NotFound from './not-found';

describe('NotFound page', () => {
  it('renders header, button and image', async () => {
    render(await NotFound());

    expect(screen.getByText('header')).toBeInTheDocument();
    expect(screen.getByText('button')).toBeInTheDocument();
    expect(screen.getByAltText('candle')).toBeInTheDocument();
  });
});
