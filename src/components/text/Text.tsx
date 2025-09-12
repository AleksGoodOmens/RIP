import { cva, type VariantProps } from 'class-variance-authority';
import { ElementType, ReactNode } from 'react';

import { cn } from '@/lib/utils';

const textVariants = cva('font-bold tracking-tight', {
  variants: {
    size: {
      xl: 'text-4xl md:text-5xl lg:text-6xl',
      lg: 'text-3xl md:text-4xl lg:text-5xl',
      md: 'text-md md:text-xl lg:text-2xl',
      sm: 'text-xl md:text-2xl lg:text-3xl',
      xs: 'text-xs md:text-xs lg:text-sm',
    },
    align: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
    },
    weight: {
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
      extrabold: 'font-extrabold',
    },
    variant: {
      'block-title': 'font-bold text-xl text-destructive',
    },
  },
  defaultVariants: {
    size: 'md',
    align: 'left',
    weight: 'normal',
  },
});

interface TextProps extends VariantProps<typeof textVariants> {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}

export const Text = ({
  children,
  className,
  as: Component = 'p',
  size,
  align,
  weight,
  variant,
  ...props
}: TextProps) => {
  return (
    <Component className={cn(textVariants({ size, align, weight, className, variant }))} {...props}>
      {children}
    </Component>
  );
};
