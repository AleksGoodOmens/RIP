import { render, screen } from '@testing-library/react';
import React, { ReactElement, ReactNode } from 'react';

import { HistoryEmpty } from './HistoryEmpty';

interface TextProps {
  children: ReactNode;
  align?: string;
  className?: string;
}

interface ButtonProps {
  children: ReactNode;
  className?: string;
  variant?: string;
  asChild?: boolean;
}

interface LinkProps {
  children: ReactNode;
  href: string;
}

interface RichValues {
  block: (chunks: string) => ReactElement;
}

interface CloneableElementProps {
  className?: string;
  'data-variant'?: string;
  children?: ReactNode;
}

jest.mock('next-intl', () => ({
  useTranslations: () => {
    const t = (key: string): string => {
      if (key === 'emptyMessage') return 'No history found. {block}';
      return key;
    };

    t.rich = (key: string, values: RichValues): (string | ReactElement)[] => {
      if (key === 'emptyMessage') {
        return [
          'No history found. ',
          React.createElement(
            'span',
            {
              key: 'block-span',
              className: 'block',
            },
            values.block('')
          ),
        ];
      }
      return [key];
    };

    return t;
  },
}));

jest.mock('@/components', () => ({
  Text: ({ children, align, className }: TextProps): ReactElement => (
    <div data-align={align} className={className}>
      {children}
    </div>
  ),
  Button: ({ children, className, variant, asChild }: ButtonProps): ReactElement => {
    if (asChild && React.Children.count(children) === 1) {
      const child = React.Children.only(children) as ReactElement<CloneableElementProps>;
      return React.cloneElement(child, {
        className: `${className} mx-auto block w-fit`,
        'data-variant': variant,
      } as CloneableElementProps);
    }
    return (
      <button className={className} data-variant={variant}>
        {children}
      </button>
    );
  },
}));

jest.mock('@/i18n/navigation', () => ({
  Link: ({ children, href }: LinkProps): ReactElement => (
    <span data-link="true" data-href={href}>
      {children}
    </span>
  ),
}));

describe('HistoryEmpty', () => {
  it('renders the empty message and link to rest client', () => {
    render(<HistoryEmpty />);

    expect(screen.getByText('No history found.')).toBeInTheDocument();

    const linkElement = screen.getByText('Rest client');
    expect(linkElement).toBeInTheDocument();
  });
});
