import { EnterButton, LocaleSwitcher, Logo, ModeToggle, Navigation } from '@/components';

interface Props {
  isMinimized: boolean;
}

export const DesktopView = ({ isMinimized }: Props) => {
  return (
    <div className="hidden md:grid md:grid-cols-12 gap-6 items-center container mx-auto">
      <Logo width={isMinimized ? 50 : 96} className="md:col-span-3" />
      <Navigation className="md:col-span-6" />
      <div className="flex items-center gap-2 justify-self-end md:col-span-3 ">
        <LocaleSwitcher />
        <ModeToggle />
        <EnterButton />
      </div>
    </div>
  );
};
