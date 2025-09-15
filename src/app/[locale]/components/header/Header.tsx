'use client';
import { useEffect, useRef, useState } from 'react';

import { usePathname } from '@/i18n/navigation';

import { DesktopView } from '../desktop-view/DesktopView';
import { MobileView } from '../mobile-view/MobileView';

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const pathname = usePathname();
  const isOpenRef = useRef(isOpen);
  const lastScrollY = useRef(0);

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

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 100) {
        if (currentScrollY > lastScrollY.current) {
          setIsMinimized(true);
        } else {
          setIsMinimized(false);
        }
      } else {
        setIsMinimized(false);
      }

      lastScrollY.current = currentScrollY;
    };

    const throttledHandleScroll = () => {
      let ticking = false;

      return () => {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            handleScroll();
            ticking = false;
          });
          ticking = true;
        }
      };
    };

    const scrollHandler = throttledHandleScroll();
    window.addEventListener('scroll', scrollHandler);

    return () => {
      window.removeEventListener('scroll', scrollHandler);
    };
  }, [pathname]);

  return (
    <header
      className={`w-full fixed bg-secondary z-50 transition-all duration-300 ${isMinimized ? 'py-0' : 'py-4'}`}
    >
      <MobileView toggleBurger={toggleBurger} active={isOpen} isMinimized={isMinimized} />
      <DesktopView isMinimized={isMinimized} />
    </header>
  );
};
