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
  const activeLink = usePathname().split('/')[1];

  const t = useTranslations('navigation');

  const links = navLinks.map((link) => {
    const isActive = link.href === '/' + activeLink;
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
