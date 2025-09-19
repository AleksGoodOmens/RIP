import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

jest.mock('@/lib/variableTransform', () => ({
  replaceVariables: (input: string, vars: Record<string, string>) =>
    input.replace(/{{(.*?)}}/g, (_, key) => vars[key] ?? `{{${key}}}`),
  encodeVariables: (input: string, vars: Record<string, string>) => {
    let result = input;
    const sorted = Object.entries(vars).sort((a, b) => b[1].length - a[1].length);
    for (const [key, value] of sorted) {
      const escaped = value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(escaped, 'g');
      result = result.replace(regex, `{{${key}}}`);
    }
    return result;
  },
}));

jest.mock('../highlight-variables/HighlightVariables', () => ({
  HighlightVariables: jest.fn(({ input }: { input: string }) => (
    <span data-testid="highlight">{input}</span>
  )),
}));

import { VariableTester } from './VariableTester';

const getBlock = (label: string) => screen.getByText(label).nextElementSibling as HTMLElement;

describe('VariableTester structured rendering', () => {
  it('renders empty state correctly', async () => {
    render(<VariableTester variables={{ userId: '123' }} />);
    const input = screen.getByPlaceholderText(/example/i);

    await userEvent.clear(input);

    expect(screen.getByTestId('highlight')).toHaveTextContent('');
    expect(getBlock('Decoded:')).toHaveTextContent('');
    expect(getBlock('Encoded:')).toHaveTextContent('');
  });

  it('encodes values with special characters', async () => {
    render(<VariableTester variables={{ token: 'abc.123' }} />);
    const input = screen.getByPlaceholderText(/example/i);

    await userEvent.clear(input);
    await userEvent.type(input, 'abc.123');

    expect(screen.getByTestId('highlight')).toHaveTextContent('abc.123');
    expect(getBlock('Decoded:')).toHaveTextContent('abc.123');
    expect(getBlock('Encoded:')).toHaveTextContent('{{token}}');
  });

  it('updates correctly after rapid input changes', async () => {
    render(<VariableTester variables={{ userId: '123' }} />);
    const input = screen.getByPlaceholderText(/example/i);

    await userEvent.clear(input);
    await userEvent.type(input, '{{userId}}');
    await userEvent.clear(input);
    await userEvent.type(input, 'static/path');

    expect(screen.getByTestId('highlight')).toHaveTextContent('static/path');
    expect(getBlock('Decoded:')).toHaveTextContent('static/path');
    expect(getBlock('Encoded:')).toHaveTextContent('static/path');
  });
});
