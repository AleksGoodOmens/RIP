import { SlotProps } from '@radix-ui/react-slot';
import { render, screen } from '@testing-library/react';
import { ReactElement, ReactNode } from 'react';

import { HistoryItem } from '@/interfaces';

import { HistoryFull } from './HistoryFull';

interface TextProps {
  children: ReactNode;
  as?: React.ForwardRefExoticComponent<SlotProps & React.RefAttributes<HTMLElement>> | string;
  className?: string;
}

interface ButtonProps {
  children: ReactNode;
  variant?: string;
  size?: string;
  asChild?: boolean;
}

interface LinkProps {
  children: ReactNode;
  href: string;
}

jest.mock('@/i18n/navigation', () => ({
  Link: ({ children, href }: LinkProps): ReactElement => <a href={href}>{children}</a>,
}));

jest.mock('@/lib/utils', () => ({
  encodeTo64: jest.fn((str: string) => btoa(str)),
}));

jest.mock('../text/Text', () => ({
  Text: ({ children, as: Component = 'div', className }: TextProps): ReactElement => (
    <Component className={className}>{children}</Component>
  ),
}));

jest.mock('../ui', () => ({
  Button: ({ children, variant, size, asChild }: ButtonProps): ReactElement => {
    if (asChild) {
      return <>{children}</>;
    }
    return (
      <button data-variant={variant} data-size={size}>
        {children}
      </button>
    );
  },
}));

describe('HistoryFull', () => {
  const mockHistory: HistoryItem[] = [
    {
      id: '1',
      base64: {
        body: 'bodyBase64',
        headers: 'headersBase64',
      },
      uid: 'user1',
      metrics: {
        requestSize: 1234,
        endpoint: '/api/test',
        url: 'https://example.com/api/test',
        responseSize: 5678,
        duration: 150.5,
        method: 'GET',
        timestamp: '2023-10-01T12:00:00Z',
        statusCode: 200,
      },
    },
    {
      id: '2',
      base64: {
        body: 'bodyBase642',
        headers: 'headersBase642',
      },
      uid: 'user1',
      metrics: {
        requestSize: 9876,
        endpoint: '/api/another',
        url: 'https://example.com/api/another',
        responseSize: 5432,
        duration: 75.2,
        method: 'POST',
        timestamp: '2023-10-02T15:30:00Z',
        statusCode: 404,
      },
    },
  ];

  it('renders history items with correct information', () => {
    render(<HistoryFull history={mockHistory} />);

    expect(screen.getByText('GET')).toBeInTheDocument();
    expect(screen.getByText('200')).toBeInTheDocument();
    expect(screen.getByText('https://example.com/api/test')).toBeInTheDocument();
    expect(screen.getByText('/api/test')).toBeInTheDocument();
    expect(screen.getByText('150.50 ms')).toBeInTheDocument();
    expect(screen.getByText('1.21 KB')).toBeInTheDocument();
    expect(screen.getByText('5.54 KB')).toBeInTheDocument();

    expect(screen.getByText('POST')).toBeInTheDocument();
    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('https://example.com/api/another')).toBeInTheDocument();
    expect(screen.getByText('/api/another')).toBeInTheDocument();
    expect(screen.getByText('75.20 ms')).toBeInTheDocument();
    expect(screen.getByText('9.64 KB')).toBeInTheDocument();

    const executeButtons = screen.getAllByText('Execute Again');
    expect(executeButtons).toHaveLength(mockHistory.length);

    expect(executeButtons[0].closest('a')).toHaveAttribute(
      'href',
      '/rest-client/GET/' + btoa(mockHistory[0].metrics.url) + '/headersBase64/bodyBase64'
    );
  });

  it('applies correct CSS classes based on method and status', () => {
    render(<HistoryFull history={mockHistory} />);

    const getMethod = screen.getByText('GET');
    expect(getMethod).toHaveClass('bg-blue-300');
    expect(getMethod).toHaveClass('text-blue-800');

    const status200 = screen.getByText('200');
    expect(status200).toHaveClass('text-green-600');

    const postMethod = screen.getByText('POST');
    expect(postMethod).toHaveClass('bg-green-300');
    expect(postMethod).toHaveClass('text-green-800');

    const status404 = screen.getByText('404');
    expect(status404).toHaveClass('text-yellow-600');
  });

  it('formats dates correctly', () => {
    render(<HistoryFull history={mockHistory} />);

    const dateElement = screen.getAllByText(/2023/);
    expect(dateElement[0]).toBeInTheDocument();
  });

  it('renders empty state when history is empty', () => {
    render(<HistoryFull history={[]} />);

    expect(screen.queryByText('Execute Again')).not.toBeInTheDocument();
    expect(screen.queryByText('GET')).not.toBeInTheDocument();
    expect(screen.queryByText('POST')).not.toBeInTheDocument();
  });
});
