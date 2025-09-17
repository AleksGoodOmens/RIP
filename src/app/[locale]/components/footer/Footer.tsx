import Image from 'next/image';
import Link from 'next/link';

import { Text } from '@/components';

import aleksAvatar from './images/ALEKS.png';
import daniarAvatar from './images/DANIAR.jpg';
import lenaAvatar from './images/LENA.jpg';
import rssLogo from './images/rss-logo.c19ce1b4.svg';

const gitHubLinks = [
  {
    href: 'https://github.com/AleksGoodOmens',
    src: aleksAvatar,
    alt: 'AleksGoodOmens',
  },
  {
    href: 'https://github.com/Lena523',
    src: lenaAvatar,
    alt: 'Lena523',
  },
  {
    href: 'https://github.com/hapurzhonau',
    src: daniarAvatar,
    alt: 'hapurzhonau',
  },
];

export const Footer = () => {
  const developmentYear = 2025;
  const currYear = new Date().getFullYear();

  const developersLinks = gitHubLinks.map((dev) => {
    return (
      <Link
        key={dev.href}
        href={dev.href}
        target="_blank"
        className="rounded-full overflow-hidden border-2 border-destructive hover:animate-spin transition-all duration-200"
      >
        <Image src={dev.src} alt={dev.alt} width={50} />
      </Link>
    );
  });

  return (
    <footer className="grid md:grid-cols-3 gap-2 justify-center md:justify-between container mx-auto items-center py-4">
      <Link
        href="https://rs.school/courses/reactjs"
        className="animate-pulse justify-self-center md:justify-self-auto"
        target="_blank"
      >
        <Image src={rssLogo} alt="RS-School" width={50} />
      </Link>
      <div className="text-2xl text-destructive font-extrabold text-center">
        {developmentYear} {developmentYear !== currYear && `- ${currYear}`}
      </div>
      <div className="justify-self-end">
        <Text align={'center'} as={'h2'} size={'md'}>
          JustCodeIt
        </Text>
        <nav className="flex gap-4 mt-2">{developersLinks}</nav>
      </div>
    </footer>
  );
};
