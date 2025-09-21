import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';

import { MobileView } from './MobileView';

jest.mock('next-intl', () => ({
  __esModule: true,
  useTranslations: () => (key: string) => key,
  useLocale: () => 'en',
  IntlProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

jest.mock('@/components/logo/Logo', () => ({
  Logo: ({ width }: { width?: number }) => <div>Mock Logo {width}</div>,
}));
jest.mock('@/components/burger/Burger', () => ({
  Burger: ({ toggleBurger, active }: { toggleBurger: () => void; active: boolean }) => (
    <button onClick={toggleBurger}>Mock Burger {active ? 'Active' : 'Inactive'}</button>
  ),
}));
jest.mock('@/components/navigation/Navigation', () => ({
  Navigation: () => <div>Mock Navigation</div>,
}));
jest.mock('@/components/mode-toggle/ModeToggle', () => ({
  ModeToggle: () => <div>Mock ModeToggle</div>,
}));
jest.mock('@/components/local-switcher/LocalSwitcher', () => ({
  LocaleSwitcher: () => <div>Mock LocaleSwitcher</div>,
}));
jest.mock('@/components/enter-button/EnterButton', () => ({
  EnterButton: () => <div>Mock EnterButton</div>,
}));

describe('MobileView', () => {
  it('renders logos and burger button', () => {
    const toggleBurger = jest.fn();
    render(<MobileView toggleBurger={toggleBurger} active={false} isMinimized={false} />);

    expect(screen.getAllByText(/Mock Logo/)).toHaveLength(2);

    expect(screen.getByText('Mock Burger Inactive')).toBeInTheDocument();
  });

  it('shows overlay when active', () => {
    const toggleBurger = jest.fn();
    render(<MobileView toggleBurger={toggleBurger} active={true} isMinimized={false} />);

    expect(screen.getByText('Mock Navigation')).toBeInTheDocument();
    expect(screen.getByText('Mock ModeToggle')).toBeInTheDocument();
    expect(screen.getByText('Mock LocaleSwitcher')).toBeInTheDocument();
    expect(screen.getByText('Mock EnterButton')).toBeInTheDocument();
  });

  it('calls toggleBurger on click', () => {
    const toggleBurger = jest.fn();
    render(<MobileView toggleBurger={toggleBurger} active={false} isMinimized={false} />);

    fireEvent.click(screen.getByText('Mock Burger Inactive'));
    expect(toggleBurger).toHaveBeenCalled();
  });
});
