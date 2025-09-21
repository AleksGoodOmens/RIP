'use client';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components';
import { HttpMethod, METHODS } from '@/interfaces';

interface SelectMethodProps {
  value?: HttpMethod;
  defaultValue?: HttpMethod;
  onValueChange?: (value: HttpMethod) => void;
  className?: string;
  name: string;
}

export function SelectMethod({
  value,
  defaultValue = 'GET',
  onValueChange,
  className,
  name,
}: SelectMethodProps) {
  return (
    <Select value={value} defaultValue={defaultValue} onValueChange={onValueChange} name={name}>
      <SelectTrigger aria-label="select method" className={`max-w-[120px] ${className}`}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent aria-label="select HTTP method">
        {METHODS.map((el) => (
          <SelectItem value={el} key={el}>
            {el}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
