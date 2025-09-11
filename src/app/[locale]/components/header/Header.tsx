'use client';
import { useEffect, useRef, useState } from 'react';

import { Logo, Burger } from '@/components';
import { usePathname } from '@/i18n/navigation';

import { DesktopView } from '../desktop-view/DesktopView';
import { MobileView } from '../mobile-view/MobileView';

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isOpenRef = useRef(isOpen);

  useEffect(() => {
    isOpenRef.current = isOpen;
  }, [isOpen]);

  const toggleBurger = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }

    const handleResize = () => {
      if (isOpenRef.current) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      document.body.classList.remove('overflow-hidden');
      window.removeEventListener('resize', handleResize);
    };
  }, [isOpen]);

  return (
    <header className=" w-full fixed bg-secondary z-50">
      <div className="container mx-auto flex items-center gap-4 justify-between">
        <Logo />
        <Burger toggleBurger={toggleBurger} active={isOpen} />
        <MobileView toggleBurger={toggleBurger} active={isOpen} />
        <DesktopView />
      </div>
    </header>
  );
};
