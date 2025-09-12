import { CircleX } from 'lucide-react';

import { EnterButton, LocaleSwitcher, Logo, ModeToggle, Navigation } from '@/components';
import { cn } from '@/lib/utils';

interface Props {
  toggleBurger: () => void;
  active: boolean;
}

export const MobileView = ({ toggleBurger, active }: Props) => {
  return (
    <div
      className={cn(
        'md:hidden fixed w-full h-dvh left-0 top-0 bg-secondary',
        active ? 'visible' : 'hidden'
      )}
    >
      <header className="flex justify-between items-center  container mx-auto animate-pulse repeat-initial py-2">
        <Logo width={75} />
        <button onClick={toggleBurger} className="p-4">
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
  );
};
