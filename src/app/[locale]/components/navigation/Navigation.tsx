'use client';
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
  const links = navLinks.map((link) => {
    const isActive = pathname === link.href;
    console.log(pathname === link.href);
    return (
      <Link
        className={cn(
          'text-primary capitalize hover:text-destructive py-2 hover:animate-pulse transition-colors duration-100',
          isActive && 'text-destructive animate-spin repeat-1 text-shadow-lg'
        )}
        key={link.href}
        href={link.href}
      >
        {link.name}
      </Link>
    );
  });
  return <nav className="grid gap-4 grid-flow-col px-4">{links}</nav>;
};
