import { render } from '@testing-library/react';

import MethodLayout from './layout';

const TestMethodLayout = async (props: {
  children: React.ReactNode;
  response: React.ReactNode;
  url: string[];
}) => {
  const params = Promise.resolve({ url: props.url });
  return MethodLayout({
    children: props.children,
    response: props.response,
    params,
  });
};

describe('MethodLayout', () => {
  it('renders correctly based on url length', async () => {
    const mockChildren = <div>Children Content</div>;
    const mockResponse = <div>Response Content</div>;

    const { container } = render(
      await TestMethodLayout({
        children: mockChildren,
        response: mockResponse,
        url: ['api', 'users'],
      })
    );

    expect(container).toHaveTextContent('Children Content');
    expect(container).toHaveTextContent('Response Content');
  });
});
