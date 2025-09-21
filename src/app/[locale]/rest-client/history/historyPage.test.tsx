import { render, screen } from '@testing-library/react';

import HistoryPage from './page';

interface TextProps {
  as?: React.ElementType;
  variant?: string;
  children?: React.ReactNode;
}

jest.mock('@/components', () => ({
  Text: ({ children, as: Component = 'div', variant }: TextProps) => (
    <Component data-testid={`text-${variant}`}>{children}</Component>
  ),
  HistoryClient: () => <div data-testid="history-client">History Client</div>,
}));

const mockGetTranslations = jest.fn();
mockGetTranslations.mockResolvedValue((key: string) => {
  if (key === 'title') return 'History';
  return key;
});

jest.mock('next-intl/server', () => ({
  getTranslations: () => mockGetTranslations(),
}));

describe('HistoryPage', () => {
  it('renders the title and HistoryClient component', async () => {
    render(await HistoryPage());

    expect(screen.getByTestId('text-main-title')).toHaveTextContent('History');

    expect(screen.getByTestId('history-client')).toBeInTheDocument();
  });
});
