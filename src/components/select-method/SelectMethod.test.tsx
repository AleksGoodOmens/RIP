import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { METHODS } from '@/interfaces';

import { SelectMethod } from './SelectMethod';

import type { ReactNode } from 'react';

interface SelectProps {
  onValueChange?: (value: string) => void;
}

interface ChildrenProps {
  children: ReactNode;
}

jest.mock('@/components', () => ({
  Select: ({ onValueChange }: SelectProps) => (
    <div>
      {METHODS.map((method) => (
        <button
          key={method}
          data-testid={`select-item-${method}`}
          onClick={() => onValueChange?.(method)}
        >
          {method}
        </button>
      ))}
    </div>
  ),
  SelectTrigger: ({ children }: ChildrenProps) => <button>{children}</button>,
  SelectContent: ({ children }: ChildrenProps) => <div>{children}</div>,
  SelectItem: ({ children }: ChildrenProps) => <div>{children}</div>,
  SelectValue: () => <span>SelectValue</span>,
}));

describe('SelectMethod', () => {
  it('calls onValueChange when method is selected', async () => {
    const handleChange = jest.fn();
    render(<SelectMethod name="method" onValueChange={handleChange} />);

    const targetMethod = METHODS.find((m) => m !== 'GET')!;
    await userEvent.click(screen.getByTestId(`select-item-${targetMethod}`));

    expect(handleChange).toHaveBeenCalledWith(targetMethod);
  });
});
