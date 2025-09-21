import { render, screen, fireEvent } from '@testing-library/react';

import ErrorComponent from './error';

jest.mock('@/components', () => ({
  __esModule: true,
  Button: ({ children, onClick }: never) => <button onClick={onClick}>{children}</button>,
  Text: ({ children }: never) => <div>{children}</div>,
}));

describe('Error component', () => {
  it('renders error title, message, and reset button', () => {
    const mockReset = jest.fn();
    const error = new Error('Something went wrong');

    render(<ErrorComponent error={error} reset={mockReset} />);

    expect(screen.getByText('titleBoundary')).toBeInTheDocument();

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();

    const button = screen.getByText('reset');
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    expect(mockReset).toHaveBeenCalled();
  });
});
