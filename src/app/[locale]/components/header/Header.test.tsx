import { render, screen, fireEvent, act } from '@testing-library/react';

import Header from './Header';

jest.mock('@/i18n/navigation', () => ({
  usePathname: jest.fn(() => '/'),
}));

jest.mock('../mobile-view/MobileView', () => ({
  MobileView: ({
    toggleBurger,
    active,
    isMinimized,
  }: {
    toggleBurger: () => void;
    active: boolean;
    isMinimized: boolean;
  }) => (
    <div>
      <button onClick={toggleBurger}>Mock Burger</button>
      <span>Mobile active: {String(active)}</span>
      <span>Mobile minimized: {String(isMinimized)}</span>
    </div>
  ),
}));

jest.mock('../desktop-view/DesktopView', () => ({
  DesktopView: ({ isMinimized }: { isMinimized: boolean }) => (
    <div>Desktop minimized: {String(isMinimized)}</div>
  ),
}));

describe('Header', () => {
  beforeEach(() => {
    document.body.className = '';
    jest.clearAllMocks();
  });

  it('renders MobileView and DesktopView', () => {
    render(<Header />);
    expect(screen.getByText(/Mobile active/i)).toBeInTheDocument();
    expect(screen.getByText(/Desktop minimized/i)).toBeInTheDocument();
  });

  it('toggles burger menu', () => {
    render(<Header />);
    const burgerButton = screen.getByText('Mock Burger');

    expect(screen.getByText(/Mobile active: false/i)).toBeInTheDocument();

    fireEvent.click(burgerButton);
    expect(screen.getByText(/Mobile active: true/i)).toBeInTheDocument();
    expect(document.body.classList.contains('overflow-hidden')).toBe(true);

    fireEvent.click(burgerButton);
    expect(screen.getByText(/Mobile active: false/i)).toBeInTheDocument();
    expect(document.body.classList.contains('overflow-hidden')).toBe(false);
  });

  it('removes overflow-hidden on unmount', () => {
    const { unmount } = render(<Header />);
    fireEvent.click(screen.getByText('Mock Burger'));
    expect(document.body.classList.contains('overflow-hidden')).toBe(true);

    unmount();
    expect(document.body.classList.contains('overflow-hidden')).toBe(false);
  });

  it('minimizes header on scroll down and restores on scroll up', () => {
    jest.useFakeTimers();
    render(<Header />);

    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 150, writable: true });
      window.dispatchEvent(new Event('scroll'));
      jest.runAllTimers();
    });

    expect(screen.getByText(/Mobile minimized: true/i)).toBeInTheDocument();
    expect(screen.getByText(/Desktop minimized: true/i)).toBeInTheDocument();

    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 50, writable: true });
      window.dispatchEvent(new Event('scroll'));
      jest.runAllTimers();
    });

    expect(screen.getByText(/Mobile minimized: false/i)).toBeInTheDocument();
    expect(screen.getByText(/Desktop minimized: false/i)).toBeInTheDocument();

    jest.useRealTimers();
  });

  it('closes menu on resize', () => {
    render(<Header />);
    fireEvent.click(screen.getByText('Mock Burger'));
    expect(screen.getByText(/Mobile active: true/i)).toBeInTheDocument();

    act(() => {
      window.dispatchEvent(new Event('resize'));
    });
    expect(screen.getByText(/Mobile active: false/i)).toBeInTheDocument();
  });
});
