import { render, screen, waitFor } from '@testing-library/react';

import { HistoryItem } from '@/interfaces';

import { HistoryClient } from './HistoryClient';

jest.mock('@/components', () => ({
  HistoryEmpty: () => <div data-testid="history-empty">No history</div>,
  HistoryFull: ({ history }: { history: HistoryItem[] }) => (
    <div data-testid="history-full">
      {history.map((item) => (
        <div key={item.id} data-testid="history-item">
          {item.metrics.url}
        </div>
      ))}
    </div>
  ),
}));

jest.mock('@/firebase/firebase', () => ({
  auth: {
    currentUser: {
      uid: 'test-uid',
    },
  },
}));

const mockFetch = jest.fn();
global.fetch = mockFetch;

describe('HistoryClient', () => {
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

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should show empty state when no history', async () => {
    mockFetch.mockResolvedValueOnce({
      json: async () => [],
    });

    render(<HistoryClient />);

    expect(await screen.findByTestId('history-empty')).toBeInTheDocument();
    expect(screen.getByText('No history')).toBeInTheDocument();

    expect(mockFetch).toHaveBeenCalledWith('/api/history?uid=test-uid');
  });

  it('should show history items when data is available', async () => {
    mockFetch.mockResolvedValueOnce({
      json: async () => mockHistory,
    });

    render(<HistoryClient />);

    await waitFor(() => {
      expect(screen.getByTestId('history-full')).toBeInTheDocument();
    });

    const historyItems = screen.getAllByTestId('history-item');
    expect(historyItems).toHaveLength(2);

    expect(historyItems[0]).toHaveTextContent('https://example.com/api/another');
    expect(historyItems[1]).toHaveTextContent('https://example.com/api/test');
  });

  it('should handle fetch errors', async () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    mockFetch.mockRejectedValueOnce(new Error('Fetch failed'));

    render(<HistoryClient />);

    expect(await screen.findByTestId('history-empty')).toBeInTheDocument();

    consoleSpy.mockRestore();
  });
});
