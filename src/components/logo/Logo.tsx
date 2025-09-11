import Image from 'next/image';

import logoIcon from './logo.svg';

interface Props {
  width?: number;
}
export const Logo = ({ width = 96 }: Props) => {
  return (
    <div className="rounded-full shadow-2xl bg-ring">
      <Image src={logoIcon} alt="justCodeIt RIP client" width={width} />
    </div>
  );
};
