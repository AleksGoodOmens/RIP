import Image from 'next/image';

import { ModeToggle, LocaleSwitcher } from '@/components';

import logo from './logo.svg';
import { Navigation } from '../navigation/Navigation';

export const Header = () => {
  return (
    <header className=" w-full fixed bg-secondary">
      <div className="container mx-auto flex items-center gap-4 justify-between">
        <Image src={logo} alt="justCodeIt RIP client" width={96} />
        <Navigation />
        <div className="flex items-center gap-2">
          <LocaleSwitcher />
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};
