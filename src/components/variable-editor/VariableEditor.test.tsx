import { render, screen } from '@testing-library/react';

jest.mock('@/components', () => ({
  PairsEditor: jest.fn(({ title }) => <div data-testid="pairs-editor">{title}</div>),
}));

jest.mock('@/components/variable-tester/VariableTester', () => ({
  VariableTester: jest.fn(({ variables }) => (
    <div data-testid="variable-tester">{Object.keys(variables).join(',')}</div>
  )),
}));

jest.mock('@/utils/hooks/useVariablePairs', () => ({
  useVariablePairs: jest.fn(),
}));

import { useVariablePairs } from '@/utils/hooks/useVariablePairs';

import { VariableEditor } from './VariableEditor';

describe('VariableEditor', () => {
  const mockPairs = [
    { key: 'userId', value: '123' },
    { key: 'baseUrl', value: 'https://api.example.com' },
  ];

  const mockMap = {
    userId: '123',
    baseUrl: 'https://api.example.com',
  };

  const setup = (status: 'loading' | 'saved' | 'error' | null = null) => {
    (useVariablePairs as jest.Mock).mockReturnValue({
      variablePairs: mockPairs,
      setVariablePairs: jest.fn(),
      updatePair: jest.fn(),
      removePair: jest.fn(),
      variableMap: mockMap,
      status,
    });

    render(<VariableEditor />);
  };

  it('renders PairsEditor and VariableTester with correct props', () => {
    setup();

    expect(screen.getByTestId('pairs-editor')).toHaveTextContent('Variables');
    expect(screen.getByTestId('variable-tester')).toHaveTextContent('userId,baseUrl');
  });

  it('shows loading status', () => {
    setup('loading');
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('shows saved status', () => {
    setup('saved');
    expect(screen.getByText(/saved/i)).toBeInTheDocument();
  });

  it('shows error status', () => {
    setup('error');
    expect(screen.getByText(/failed to save/i)).toBeInTheDocument();
  });
});
