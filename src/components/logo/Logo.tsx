import Image from 'next/image';

import { cn } from '@/lib/utils';

import logoIcon from './logo.svg';

interface Props {
  width?: number;
  className?: string;
}
export const Logo = ({ width = 96, className }: Props) => {
  return (
    <div className={cn('rounded-full shadow-2xl bg-foreground dark:bg-ring max-w-fit', className)}>
      <Image src={logoIcon} alt="justCodeIt RIP client" width={width} height={width} priority />
    </div>
  );
};
