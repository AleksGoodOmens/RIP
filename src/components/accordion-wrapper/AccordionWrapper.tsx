'use client';

import { ArrowBigDownDash, ArrowBigUpDash } from 'lucide-react';
import { PropsWithChildren, useState } from 'react';

import { Button, Text } from '@/components';
import { cn } from '@/lib/utils';

interface AccordionWrapperProps extends PropsWithChildren {
  title: string;
}

export const AccordionWrapper = ({ title, children }: AccordionWrapperProps) => {
  const [isHided, setIsHided] = useState(false);

  const handleShow = () => {
    setIsHided((prev) => !prev);
  };
  return (
    <section
      className={cn(
        'p-4 border-2 border-destructive rounded-2xl',
        'grid transition-all duration-300',
        isHided ? 'grid-rows-[0fr]' : 'grid-rows-[1fr]'
      )}
    >
      <div className="min-h-9 overflow-hidden">
        <header className="flex gap-4 mb-4">
          <Text as={'h3'} variant={'block-title'}>
            {title}
          </Text>
          <Button aria-label={isHided ? 'show' : 'hide'} onClick={handleShow}>
            {isHided ? <ArrowBigDownDash /> : <ArrowBigUpDash />}
          </Button>
        </header>
        {children}
      </div>
    </section>
  );
};
