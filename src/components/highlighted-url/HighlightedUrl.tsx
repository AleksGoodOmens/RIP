import { ChangeEvent, useEffect, useRef, useState } from 'react';

import { HighlightVariables } from '../highlight-variables/HighlightVariables';
import { Input } from '../ui';

interface Props {
  value: string;
  variables: Record<string, string>;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  name?: string;
}

export const HighlightedUrl = ({ value, variables, onChange, placeholder }: Props) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (inputRef.current && overlayRef.current) {
        overlayRef.current.scrollLeft = inputRef.current.scrollLeft;
      }
    };

    const input = inputRef.current;
    if (input) {
      input.addEventListener('scroll', handleScroll);
      return () => input.removeEventListener('scroll', handleScroll);
    }
  }, []);

  useEffect(() => {
    if (inputRef.current && overlayRef.current) {
      const inputStyle = getComputedStyle(inputRef.current);

      overlayRef.current.style.font = inputStyle.font;
      overlayRef.current.style.lineHeight = inputStyle.lineHeight;
      overlayRef.current.style.letterSpacing = inputStyle.letterSpacing;
      overlayRef.current.style.padding = inputStyle.padding;
      overlayRef.current.style.margin = inputStyle.margin;
    }
  }, [value]);

  return (
    <div className="relative w-full">
      <Input
        ref={inputRef}
        type="text"
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        className="w-full h-full  bg-transparent text-transparent caret-foreground z-10 relative"
        style={{
          color: 'transparent',
          WebkitTextFillColor: 'transparent',
        }}
      />

      <div
        ref={overlayRef}
        className="absolute top-1 left-0 w-full h-full pointer-events-none overflow-hidden whitespace-nowrap z-0 "
      >
        {value ? (
          <HighlightVariables input={value} variables={variables} />
        ) : (
          <span className="text-muted-foreground/50 ">{placeholder}</span>
        )}
      </div>

      {isFocused && (
        <div className="absolute inset-0 border-2 border-secondary-foreground rounded pointer-events-none z-20" />
      )}
    </div>
  );
};
