import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import fetchMock from 'jest-fetch-mock';

const pushMock = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}));

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));
jest.mock('next-intl/server', () => ({
  getTranslations: () => (key: string) => key,
}));

jest.mock('next-intl/navigation', () => ({
  createNavigation: () => ({
    push: jest.fn(),
    replace: jest.fn(),
  }),
}));

jest.mock('next-intl/routing', () => ({
  defineRouting: () => ({}),
}));

jest.mock('react-syntax-highlighter/dist/esm/styles/prism', () => ({
  atomDark: {},
  oneLight: {},
}));

jest.mock('react-syntax-highlighter/dist/esm/styles/hljs', () => ({
  atomOneDark: {},
  atomOneLight: {},
}));

import RestClient from './RestClient';

beforeEach(() => {
  Storage.prototype.getItem = jest.fn(() => JSON.stringify([['token', 'abc']]));
  Storage.prototype.setItem = jest.fn();
  fetchMock.resetMocks();
  fetchMock.mockResponseOnce(JSON.stringify({ success: true }));
  pushMock.mockClear();
});

describe('RestClient', () => {
  it('renders form and submits correctly', async () => {
    render(<RestClient initialMethod="POST" initialUrl="https://api.example.com" />);

    const input = screen.getByPlaceholderText('rest-client.url-placeholder');
    const button = screen.getByRole('button', { name: 'rest-client.send' });

    expect(input).toHaveValue('https://api.example.com');
    expect(button).not.toBeDisabled();

    await userEvent.clear(input);
    await userEvent.type(input, 'https://new.com');
    expect(input).toHaveValue('https://new.com');

    await userEvent.click(button);

    expect(pushMock).toHaveBeenCalledTimes(1);
    expect(pushMock).toHaveBeenCalledWith(expect.stringMatching(/^\/rest-client\/POST\/.+\/.+\/$/));
  });
});
