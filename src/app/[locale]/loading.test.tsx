import { render, screen } from '@testing-library/react';
import React from 'react';

import Loading from './loading';

jest.mock('@/components', () => ({
  Spinner: () => <div>Loading...</div>,
}));

describe('Loading', () => {
  it('renders Spinner', () => {
    render(<Loading />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});
