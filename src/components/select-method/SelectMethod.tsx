'use client';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components';

const METHODS = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'] as const;

type MethodProps = (typeof METHODS)[number];

interface SelectMethodProps {
  value?: MethodProps;
  defaultValue?: MethodProps;
  onValueChange?: (value: MethodProps) => void;
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
      <SelectTrigger className={`max-w-[120px] ${className}`}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {METHODS.map((el) => (
          <SelectItem value={el} key={el}>
            {el}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
