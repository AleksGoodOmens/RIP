import { LocaleSwitcher, ModeToggle } from '@/components';

import { Navigation } from '../navigation/Navigation';

export const DesktopView = () => {
  return (
    <div className="hidden md:flex basis-2/3 gap-4 items-center justify-between">
      <Navigation />
      <div className="flex items-center gap-2 justify-self-end ">
        <LocaleSwitcher />
        <ModeToggle />
      </div>
    </div>
  );
};
