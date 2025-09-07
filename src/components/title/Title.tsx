import { cva, type VariantProps } from 'class-variance-authority';
import { ElementType, ReactNode } from 'react';

import { cn } from '@/lib/utils';

const titleVariants = cva('font-bold tracking-tight', {
  variants: {
    size: {
      xl: 'text-4xl md:text-5xl lg:text-6xl',
      lg: 'text-3xl md:text-4xl lg:text-5xl',
      md: 'text-2xl md:text-3xl lg:text-4xl',
      sm: 'text-xl md:text-2xl lg:text-3xl',
      xs: 'text-lg md:text-xl lg:text-2xl',
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
  },
  defaultVariants: {
    size: 'md',
    align: 'left',
    weight: 'bold',
  },
});

// Определяем типы для пропсов
interface TitleProps extends VariantProps<typeof titleVariants> {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}

// Создаем компонент
export const Title = ({
  children,
  className,
  as: Component = 'h2',
  size,
  align,
  weight,
  ...props
}: TitleProps) => {
  return (
    <Component className={cn(titleVariants({ size, align, weight, className }))} {...props}>
      {children}
    </Component>
  );
};
