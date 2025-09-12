import { SquareMenu } from 'lucide-react';

import { cn } from '@/lib/utils';

interface Props {
  toggleBurger: () => void;
  active: boolean;
}

export const Burger = ({ toggleBurger, active }: Props) => {
  return (
    <button onClick={toggleBurger} className="md:hidden p-4 animate-pulse">
      <SquareMenu className={cn(active && 'stroke-destructive')} />
    </button>
  );
};
