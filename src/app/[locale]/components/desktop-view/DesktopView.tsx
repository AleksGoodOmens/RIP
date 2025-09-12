import { EnterButton, LocaleSwitcher, ModeToggle, Navigation } from '@/components';

export const DesktopView = () => {
  return (
    <div className="hidden md:flex basis-2/3 gap-4 items-center justify-between">
      <Navigation />
      <div className="flex items-center gap-2 justify-self-end ">
        <LocaleSwitcher />
        <ModeToggle />
        <EnterButton />
      </div>
    </div>
  );
};
