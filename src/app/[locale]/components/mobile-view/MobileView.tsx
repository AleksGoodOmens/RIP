import { CircleX } from 'lucide-react';

import { Burger, EnterButton, LocaleSwitcher, Logo, ModeToggle, Navigation } from '@/components';
import { cn } from '@/lib/utils';

interface Props {
  toggleBurger: () => void;
  active: boolean;
  isMinimized: boolean;
}

export const MobileView = ({ toggleBurger, active, isMinimized }: Props) => {
  return (
    <div className="container mx-auto">
      <div className="md:hidden flex justify-between items-center">
        <Logo width={isMinimized ? 50 : 96} />
        <Burger toggleBurger={toggleBurger} active={active} />
      </div>
      <div
        className={cn(
          'md:hidden fixed w-full h-dvh left-0 top-0 bg-secondary',
          active ? 'visible' : 'hidden'
        )}
      >
        <header className="flex justify-between items-center  container mx-auto animate-pulse repeat-initial py-2">
          <Logo width={75} />
          <button aria-label="toggle burger" onClick={toggleBurger} className="p-4">
            <CircleX />
          </button>
        </header>
        <div className="grid place-content-center gap-30 h-full container mx-auto animate-pulse repeat-initial">
          <Navigation />
          <div className="flex gap-2 items-center">
            <ModeToggle />
            <LocaleSwitcher />
            <EnterButton />
          </div>
        </div>
      </div>
    </div>
  );
};
