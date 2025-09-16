import { PropsWithChildren, ReactNode } from 'react';

interface Props extends PropsWithChildren {
  response: ReactNode;
  params: Promise<{ url: string[] }>;
}

const MethodLayout = async ({ children, response, params }: Props) => {
  const showResponse = (await params).url.length > 1;
  return (
    <>
      {children}
      {showResponse && response}
    </>
  );
};

export default MethodLayout;
