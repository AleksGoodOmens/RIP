import { render, screen } from '@testing-library/react';
import { getTranslations } from 'next-intl/server';
import React from 'react';

import RestClientPage from '@/app/[locale]/rest-client/[...url]/@response/page';

import { getResponse } from '../action';

jest.mock('next-intl/server');
jest.mock('../action');

jest.mock('@/components/accordion-wrapper/AccordionWrapper', () => ({
  AccordionWrapper: ({
    children,
    title,
    collapsed,
  }: {
    children: React.ReactNode;
    title: string;
    collapsed?: boolean;
  }) => (
    <div data-testid="accordion-wrapper" data-collapsed={collapsed}>
      <h3>{title}</h3>
      {children}
    </div>
  ),
}));

jest.mock('@/components/highlighter-response/highlighter-response', () => ({
  HighlighterResponse: ({
    responseBody,
    responseStatus,
  }: {
    responseBody: unknown;
    responseStatus: number;
  }) => (
    <div data-testid="highlighter-response">
      <span data-testid="status-text">Status: {responseStatus}</span>
      <span data-testid="body-text">
        Body: {typeof responseBody === 'string' ? responseBody : JSON.stringify(responseBody)}
      </span>
    </div>
  ),
}));

jest.mock('lucide-react', () => ({
  ArrowBigDownDash: () => <span>↓</span>,
  ArrowBigUpDash: () => <span>↑</span>,
  TypeOutline: () => <span>T</span>,
  Braces: () => <span>{'{}'}</span>,
}));

jest.mock('next-themes', () => ({
  useTheme: () => ({ theme: 'light' }),
}));

jest.mock('react-syntax-highlighter', () => ({
  Prism: ({
    children,
    language,
    style,
    showLineNumbers,
    customStyle,
  }: {
    children: React.ReactNode;
    language: string;
    style: Record<string, unknown>;
    showLineNumbers: boolean;
    customStyle: React.CSSProperties;
  }) => (
    <pre
      data-language={language}
      data-style={Object.keys(style)[0]}
      data-linenumbers={showLineNumbers.toString()}
      style={customStyle}
    >
      {children}
    </pre>
  ),
}));

jest.mock('react-syntax-highlighter/dist/esm/styles/prism', () => ({
  atomDark: { 'test-atom-dark': true },
  oneLight: { 'test-one-light': true },
}));

const mockedGetTranslations = getTranslations as jest.Mock;
const mockedGetResponse = getResponse as jest.Mock;

describe('RestClientPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    mockedGetTranslations.mockResolvedValue(() => 'response');
  });

  it('renders response component with correct data', async () => {
    const mockParams = Promise.resolve({
      url: ['GET', 'dGVzdC11cmw=', 'dGVzdC1oZWFkZXJz', 'dGVzdC1ib2R5'] as [
        string,
        string,
        string,
        string,
      ],
    });

    mockedGetResponse.mockResolvedValue({
      status: 200,
      body: '{"message": "success"}',
    });

    const Component = await RestClientPage({ params: mockParams });
    render(Component);

    expect(screen.getByTestId('accordion-wrapper')).toBeInTheDocument();
    expect(screen.getByTestId('highlighter-response')).toBeInTheDocument();

    expect(screen.getByTestId('status-text')).toHaveTextContent('Status: 200');
    expect(screen.getByTestId('body-text')).toHaveTextContent('Body: {"message": "success"}');

    expect(mockedGetTranslations).toHaveBeenCalledWith('rest-client.titles');
    expect(mockedGetResponse).toHaveBeenCalledWith({
      urlInBase64: 'dGVzdC11cmw=',
      method: 'GET',
      headersBase64: 'dGVzdC1oZWFkZXJz',
      bodyBase64: 'dGVzdC1ib2R5',
    });
  });

  it('handles empty bodyBase64 parameter', async () => {
    const mockParams = Promise.resolve({
      url: ['POST', 'dGVzdC11cmw=', 'dGVzdC1oZWFkZXJz'] as [string, string, string],
    });

    mockedGetResponse.mockResolvedValue({
      status: 201,
      body: '{"created": true}',
    });

    const Component = await RestClientPage({ params: mockParams });
    render(Component);

    expect(mockedGetResponse).toHaveBeenCalledWith({
      urlInBase64: 'dGVzdC11cmw=',
      method: 'POST',
      headersBase64: 'dGVzdC1oZWFkZXJz',
      bodyBase64: '',
    });
  });

  it('shows error message when getResponse returns undefined', async () => {
    const mockParams = Promise.resolve({
      url: ['GET', 'dGVzdC11cmw=', 'dGVzdC1oZWFkZXJz'] as [string, string, string],
    });

    mockedGetResponse.mockResolvedValue(undefined);

    const Component = await RestClientPage({ params: mockParams });
    render(Component);

    expect(screen.getByText('Unexpected error')).toBeInTheDocument();
    expect(screen.queryByTestId('accordion-wrapper')).not.toBeInTheDocument();
  });

  it('handles API error responses', async () => {
    const mockParams = Promise.resolve({
      url: ['GET', 'dGVzdC11cmw=', 'dGVzdC1oZWFkZXJz'] as [string, string, string],
    });

    mockedGetResponse.mockResolvedValue({
      status: 404,
      body: '{"error": "Not found"}',
    });

    const Component = await RestClientPage({ params: mockParams });
    render(Component);

    expect(screen.getByTestId('status-text')).toHaveTextContent('Status: 404');
    expect(screen.getByTestId('body-text')).toHaveTextContent('Body: {"error": "Not found"}');
  });

  it('handles non-JSON response body', async () => {
    const mockParams = Promise.resolve({
      url: ['GET', 'dGVzdC11cmw=', 'dGVzdC1oZWFkZXJz'] as [string, string, string],
    });

    mockedGetResponse.mockResolvedValue({
      status: 200,
      body: 'plain text response',
    });

    const Component = await RestClientPage({ params: mockParams });
    render(Component);

    expect(screen.getByTestId('status-text')).toHaveTextContent('Status: 200');
    expect(screen.getByTestId('body-text')).toHaveTextContent('Body: plain text response');
  });
});
