import { PropsWithChildren, ReactNode } from 'react';

interface Props extends PropsWithChildren {
  responseSection: ReactNode;
}

const MethodLayout = ({ children, responseSection }: Props) => {
  return (
    <>
      {children}
      {responseSection}
    </>
  );
};

export default MethodLayout;
