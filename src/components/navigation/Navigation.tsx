'use client';
import { useTranslations } from 'next-intl';

import { Link, usePathname } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

interface Props {
  className?: string;
}

const navLinks = [
  { href: '/', name: 'home' },
  { href: '/rest-client', name: 'REST-client' },
  { href: '/rest-client/history', name: 'history' },
  { href: '/preview', name: 'preview' },
];

export const Navigation = ({ className }: Props) => {
  const activeLink = usePathname();

  const t = useTranslations('navigation');

  const getIsActive = (href: string) => {
    if (href === '/rest-client') {
      return activeLink.startsWith('/rest-client') && activeLink !== '/rest-client/history';
    }
    if (href === '/rest-client/history') {
      return activeLink === '/rest-client/history';
    }
    return activeLink === href;
  };

  const links = navLinks.map((link) => {
    const isActive = getIsActive(link.href);

    return (
      <Link
        className={cn(
          'text-primary capitalize hover:text-destructive py-2 hover:animate-pulse transition-colors duration-100 text-center',

          isActive && 'text-destructive animate-pulse md:animate-spin md:repeat-1 text-shadow-lg'
        )}
        key={link.href}
        href={link.href}
      >
        {t(link.name)}
      </Link>
    );
  });
  return <nav className={cn('grid gap-2 md:grid-flow-col border-x-2', className)}>{links}</nav>;
};
