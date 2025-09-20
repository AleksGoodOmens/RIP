import '@testing-library/jest-dom';
import fetchMock from 'jest-fetch-mock';

jest.mock('next/navigation', () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));
jest.mock('next-intl', () => ({
  __esModule: true,
  useTranslations: () => (key: string) => key,
}));

jest.mock('next/navigation', () => ({
  __esModule: true,
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

jest.mock('next-intl/navigation', () => ({
  __esModule: true,
  createNavigation: () => ({
    push: jest.fn(),
    replace: jest.fn(),
  }),
}));

jest.mock('next-intl/routing', () => ({
  __esModule: true,
  defineRouting: () => ({}),
}));

jest.mock('react-syntax-highlighter/dist/esm/styles/prism', () => ({
  __esModule: true,
  atomDark: {},
  oneLight: {},
}));

jest.mock('react-syntax-highlighter/dist/esm/styles/hljs', () => ({
  __esModule: true,
  atomOneDark: {},
  atomOneLight: {},
}));
fetchMock.enableMocks();
