import { render } from '@testing-library/react';

import { DesktopView } from './DesktopView';

interface LogoProps {
  width: number;
}

const logoProps: LogoProps[] = [];

jest.mock('@/components', () => ({
  Logo: (props: LogoProps) => {
    logoProps.push(props);
    return <div data-testid="logo" />;
  },
  Navigation: () => <nav data-testid="navigation" />,
  LocaleSwitcher: () => <button data-testid="locale-switcher" />,
  ModeToggle: () => <button data-testid="mode-toggle" />,
  EnterButton: () => <button data-testid="enter-button" />,
}));

beforeEach(() => {
  logoProps.length = 0;
});

describe('DesktopView', () => {
  it('renders Logo with width=50 when isMinimized is true', () => {
    render(<DesktopView isMinimized={true} />);
    expect(logoProps[0].width).toBe(50);
  });

  it('renders Logo with width=96 when isMinimized is false', () => {
    render(<DesktopView isMinimized={false} />);
    expect(logoProps[0].width).toBe(96);
  });
});
