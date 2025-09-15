'use client';
import { useTranslations } from 'next-intl';

import { Link, usePathname } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', name: 'home' },
  { href: '/rest-client', name: 'REST-client' },
  { href: '/history', name: 'history' },
  { href: '/preview', name: 'preview' },
];

export const Navigation = () => {
  const pathname = usePathname();
  const arr = pathname.split('/');
  console.log(pathname);
  const t = useTranslations('navigation');

  const links = navLinks.map((link) => {
    const isActive = pathname === link.href ? true : arr.find((l) => '/' + l === link.href);
    return (
      <Link
        className={cn(
          'text-primary capitalize hover:text-destructive py-2 hover:animate-pulse transition-colors duration-100',
          isActive && 'text-destructive animate-pulse md:animate-spin md:repeat-1 text-shadow-lg'
        )}
        key={link.href}
        href={link.href}
      >
        {t(link.name)}
      </Link>
    );
  });
  return <nav className="grid gap-4 md:grid-flow-col px-4">{links}</nav>;
};
