import { InputField, Title } from '@/components';
import { Button } from '@/components/ui';

const PreviewPage = () => {
  return (
    <div>
      <Title size={'xl'} as={'h1'}>
        Title h1
      </Title>
      <Title size={'lg'}>Title h2</Title>
      <Title size={'md'} align={'center'} as={'h3'}>
        Title center md
      </Title>
      <Title size={'sm'} weight={'bold'} as={'h4'}>
        Title center sm bold
      </Title>
      <Title size={'xs'} align={'right'}>
        title xs right{' '}
      </Title>

      <Button variant={'default'}>default</Button>
      <Button variant={'link'}>link</Button>
      <Button variant={'destructive'}>destructive</Button>
      <Button variant={'ghost'}>ghost</Button>
      <Button variant={'outline'}>outline</Button>
      <Button variant={'secondary'}>secondary</Button>
      <InputField label="default state" />
      <InputField label="disabled state" disabled />
      <InputField label="with helper text" helperText="this is helper text" />
      <InputField label="error state" error="this is error" />
      <InputField type="email" placeholder="Email" label="Email" />
      <InputField type="password" placeholder="password" label="Password" />
    </div>
  );
};
export default PreviewPage;
