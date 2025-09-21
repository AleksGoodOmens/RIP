import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { IPair } from '@/interfaces';

import { Pair } from './Pair';

describe('Pair', () => {
  const index = 0;
  const initialPair: IPair = ['originalKey', 'originalValue'];

  const setup = (pair: IPair = initialPair) => {
    const handleRemovePair = jest.fn();
    const handleUpdatePair = jest.fn();

    render(
      <ul>
        <Pair
          pair={pair}
          index={index}
          handleRemovePair={handleRemovePair}
          handleUpdatePair={handleUpdatePair}
        />
      </ul>
    );

    return { handleRemovePair, handleUpdatePair };
  };

  it('renders inputs with correct values', () => {
    setup();
    expect(screen.getByPlaceholderText('key')).toHaveValue('originalKey');
    expect(screen.getByPlaceholderText('value')).toHaveValue('originalValue');
  });

  it('calls handleRemovePair when delete button is clicked', async () => {
    const { handleRemovePair } = setup();
    const user = userEvent.setup();
    await user.click(screen.getByLabelText('delete'));
    expect(handleRemovePair).toHaveBeenCalledWith(index);
  });

  it('toggles edit mode and enables inputs', async () => {
    setup();
    const user = userEvent.setup();
    await user.click(screen.getByLabelText('edit'));
    expect(screen.getByLabelText('save')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('key')).not.toBeDisabled();
    expect(screen.getByPlaceholderText('value')).not.toBeDisabled();
  });

  it('does not call handleUpdatePair if values are unchanged', async () => {
    const { handleUpdatePair } = setup();
    const user = userEvent.setup();

    await user.click(screen.getByLabelText('edit'));

    await act(() => new Promise((r) => setTimeout(r, 350)));

    expect(handleUpdatePair).not.toHaveBeenCalled();
  });
});
